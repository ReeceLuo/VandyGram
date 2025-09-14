import fs from "fs";
import imagekit from "../configs/imagekit.js";
import Post from "../models/Post.js";
import User from "../models/User.js";

// Add Post
export const addPost = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { content, post_type } = req.body;
    const images = req.files;

    let image_urls = [];

    if (images.length) {
      image_urls = await Promise.all(
        images.map(async (image) => {
          const fileBuffer = fs.readFileSync(image.path);
          const response = await imagekit.upload({
            file: fileBuffer,
            fileName: image.originalname,
            folder: "posts",
          });

          const url = imagekit.url({
            path: response.filePath,
            transformation: [
              { quality: "auto" },
              { format: "webp" },
              { width: "1280" },
            ],
          });
          return url;
        })
      );
    }
    await Post.create({
      user: userId,
      content,
      image_urls,
      post_type,
    });

    res.json({ success: true, message: "Post created successfully." });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get posts (for feed)
export const getFeedPosts = async (req, res) => {
  try {
    const { userId } = req.auth();
    const user = await User.findById(userId);

    // Gets post of user, friends, and following
    const userIds = [userId, ...user.friends, ...user.following];
    const posts = await Post.find({ user: { $in: userIds } })
      .populate("user")
      .populate({
        path: "comments.user",
        select: "full_name username profile_picture",
        model: "User"
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, posts });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Like Post
export const likePost = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { postId } = req.body;

    const post = await Post.findById(postId);

    // Check if user has already liked the post
    // Gives unlike functionality
    if (post.likes_count.includes(userId)) {
      post.likes_count = post.likes_count.filter((user) => user !== userId);
      await post.save();
      return res.json({ success: true, message: "Post unliked." });
    } else {
      post.likes_count.push(userId);
      await post.save();
      return res.json({ success: true, message: "Post liked." });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Leave comment
export const leaveComment = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { postId, content } = req.body;

    // Validate input
    if (!content || content.trim() === "") {
      return res.json({
        success: false,
        message: "Comment content is required.",
      });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.json({ success: false, message: "Post not found." });
    }

    // Create new comment object
    const newComment = {
      user: userId,
      // profile_picture: user.profile_picture,
      content: content.trim(),
      createdAt: new Date(),
    };

    // Add comment to post
    post.comments.push(newComment);
    await post.save();

    // Return the post with populated comments
    const updatedPost = await Post.findById(postId)
      .populate("user")
      .populate({
        path: "comments.user",
        select: "full_name username profile_picture",
        model: "User"
      });

    res.json({
      success: true,
      message: "Comment added successfully.",
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
