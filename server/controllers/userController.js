import imagekit from "../configs/imagekit.js";
import { inngest } from "../inngest/index.js";
import Friend from "../models/Friends.js";
import Post from "../models/Post.js";
import User from "../models/User.js";
import fs from "fs";

// Get User Data using userId
export const getUserData = async (req, res) => {
  try {
    const { userId } = req.auth();
    const user = await User.findById(userId); // Searches database using User mongoose schema
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update User Data
export const updateUserData = async (req, res) => {
  try {
    const { userId } = req.auth();
    let { username, bio, location, full_name, major, year } = req.body;

    const tempUser = await User.findById(userId);

    !username && (username = tempUser.username);

    if (tempUser.username !== username) {
      const user = await User.findOne({ username });
      // do not update username if already taken
      if (user) {
        username = tempUser.username;
      }
    }

    const updatedData = {
      username,
      bio,
      location,
      full_name,
      major,
      year,
    };

    const profile = req.files.profile && req.files.profile[0];
    const cover = req.files.cover && req.files.cover[0];

    if (profile) {
      const buffer = fs.readFileSync(profile.path);
      const response = await imagekit.upload({
        file: buffer,
        fileName: profile.originalname,
      });

      const url = imagekit.url({
        path: response.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: "1280" },
        ],
      });

      updatedData.profile_picture = url;
    }

    if (cover) {
      const buffer = fs.readFileSync(cover.path);
      const response = await imagekit.upload({
        file: buffer,
        fileName: cover.originalname,
      });

      const url = imagekit.url({
        path: response.filePath,
        transformation: [
          { quality: "auto" },
          { format: "webp" },
          { width: "1280" },
        ],
      });

      updatedData.cover_photo = url;
    }

    const user = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    res.json({ success: true, user, message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Search users using username, name, email, year, location, major

export const discoverUsers = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { input } = req.body;

    const allUsers = await User.find({
      $or: [
        { username: new RegExp(input, "i") },
        { email: new RegExp(input, "i") },
        { full_name: new RegExp(input, "i") },
        { location: new RegExp(input, "i") },
        { major: new RegExp(input, "i") },
        { year: new RegExp(input, "i") },
      ],
    });

    const filteredUsers = allUsers.filter((user) => user._id !== userId); // does not return current user
    res.json({ success: true, users: filteredUsers });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Follow user
export const followUser = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const user = await User.findById(userId);

    if (user.following.includes(id)) {
      return res.json({
        success: false,
        message: "You are already following this user.",
      });
    }

    user.following.push(id);
    await user.save();

    const toUser = await User.findById(id);
    toUser.followers.push(userId);
    await toUser.save();

    res.json({ success: true, message: "You are now following this user" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Unfollow user
export const unfollowUser = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const user = await User.findById(userId);
    user.following = user.following.filter((user) => user !== id);
    await user.save();

    const toUser = await User.findById(id);
    toUser.followers = toUser.followers.filter((user) => user !== userId);
    await toUser.save();

    res.json({
      success: true,
      message: "You are no longer following this user",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Send friend request
export const sendFriendRequest = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    // Check if user has sent more than 10 friend requests in the last day

    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const friendRequests = await Friend.find({
      from_user_id: userId,
      createdAt: { $gt: last24Hours },
    });

    if (friendRequests.length >= 10) {
      return res.json({
        success: false,
        message:
          "You have reached the limit of 10 friend requests in the last 24 hours.",
      });
    }

    // Check if users are already friends
    const existingFriendship = await Friend.findOne({
      $or: [
        { from_user_id: userId, to_user_id: id },
        { from_user_id: id, to_user_id: userId },
      ],
    });

    if (!existingFriendship) {
      const newFriend = await Friend.create({
        from_user_id: userId,
        to_user_id: id,
      });

      await inngest.send({
        name: "app/friend-request",
        data: { friendId: newFriend._id },
      });

      return res.json({ success: true, message: "Friend request sent!" });
    } else if (existingFriendship && existingFriendship.status === "accepted") {
      return res.json({ success: false, message: "You are already friends!" });
    }

    return res.json({ success: false, message: "Friend request is pending." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get user friends

export const getUserFriends = async (req, res) => {
  try {
    const { userId } = req.auth();
    const user = await User.findById(userId).populate(
      "friends followers following"
    );

    const friends = user.friends;
    const followers = user.followers;
    const following = user.following;

    const pendingFriends = (
      await Friend.find({ to_user_id: userId, status: "pending" }).populate(
        "from_user_id"
      )
    ).map((friend) => friend.from_user_id);

    res.json({ success: true, friends, followers, following, pendingFriends });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Accept friend request
export const acceptFriendRequest = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const friendRequest = await Friend.findOne({
      from_user_id: id,
      to_user_id: userId,
      status: "pending",
    });

    if (!friendRequest) {
      return res.json({
        success: false,
        message: "No pending friend request found.",
      });
    }

    // Add friend to user's list
    const user = await User.findById(userId);
    user.friends.push(id);
    await user.save();

    // Add user to friend's list
    const toUser = await User.findById(id);
    toUser.friends.push(userId);
    await toUser.save();

    friendRequest.status = "accepted";
    await friendRequest.save();
    res.json({ success: true, message: "Friend request accepted!" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get User Profiles
export const getUserProfiles = async (req, res) => {
  try {
    const { profileId } = req.body;
    const profile = await User.findById(profileId);
    if (!profile) {
      return res.json({ success: false, message: "Profile not found" });
    }
    const posts = await Post.find({ user: profileId }).populate("user");
    res.json({ success: true, profile, posts });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
