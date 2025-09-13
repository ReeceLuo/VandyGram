import { Inngest } from "inngest";
import connectDB from "../configs/db.js";
import Friend from "../models/Friends.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "my-app" });

//user.created, user.updated, user.deleted are all events from clerk webhooks

// ingest function to save user data from clerk to database
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();
    const User = (await import("../models/User.js")).default;

    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    let username = email_addresses[0].email_address.split("@")[0];

    // Check if username is available
    const existingUser = await User.findOne({ username }); // search for username in MongoDB database

    for (let attempt = 0; attempt < 10 && existingUser; attempt++) {
      username = username + Math.floor(Math.random() * 10000);
      existingUser = await User.findOne({ username });
    }

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      // full_name: first_name + " " + last_name,
      full_name: first_name + " " + last_name,
      profile_picture: image_url,
      username,
    };
    await User.create(userData);
  }
);

// Inngest function to update user data in database
const syncUserUpdate = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    await connectDB();
    const User = (await import("../models/User.js")).default;

    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const updatedUserData = {
      email: email_addresses[0].email_address,
      full_name: first_name + " " + last_name,
      profile_picture: image_url,
    };
    await User.findByIdAndUpdate(id, updatedUserData);
  }
);

// Inngest function to delete user from database
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();
    const User = (await import("../models/User.js")).default;

    const { id } = event.data;
    await User.findByIdAndDelete(id);
  }
);

// Inngest function to send reminder when new friend request is added
const sendFriendRequestReminder = inngest.createFunction(
  { id: "send-new-friend-request-reminder" },
  { event: "app/friend_request" },
  async ({ event, step }) => {
    const { friendId } = event.data;
    await step.run("send-friend-request-email", async () => {
      const friend = await Friend.findById(friendId).populate(
        "from_user_id",
        "to_user_id"
      );
      const subject = "👋 New Friend Request on VandyGram!";
      const body = `
      <div style = "font-family: Arial, sans-serif; padding: 20px;">
      <h2>Hi ${friend.to_user_id.full_name},</h2>
      <p>You have a new friend request from <strong>${friend.from_user_id.full_name}</strong> on VandyGram!</p>
      <p>Click <a href="${process.env.FRONTEND_URL}/friends" style = "color:#10b981;">here</a> to accept or decline the request.</p>
      <br/>
      <p>Thanks! <br/>VandyGram</p>
      </div>
      `;

      await sendEmail({
        to: friend.to_user_id.email,
        subject,
        body,
      });
    });

    const in24Hours = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await step.sleepUntil("wait-for-24-hours", in24Hours);
    await step.run("send-friend-request-reminder", async () => {
      const friend = await Friend.findById(friendId).populate(
        "from_user_id to_user_id"
      );

      if (friend.status === "accepted") {
        return { message: "Already accepted" };
      }

      const subject = "👋 New Friend Request on VandyGram!";
      const body = `
      <div style = "font-family: Arial, sans-serif; padding: 20px;">
      <h2>Hi ${friend.to_user_id.full_name},</h2>
      <p>You have a new friend request from <strong>${friend.from_user_id.full_name}</strong> on VandyGram!</p>
      <p>Click <a href="${process.env.FRONTEND_URL}/friends" style = "color:#10b981;">here</a> to accept or decline the request.</p>
      <br/>
      <p>Thanks! <br/>VandyGram</p>
      </div>
      `;

      await sendEmail({
        to: friend.to_user_id.email,
        subject,
        body,
      });

      return { message: "Reminder sent" };
    });
  }
);

// Inngest function to delete story after 24 hours
const deleteStory = inngest.createFunction(
  { id: "story-delete" },
  { event: "app/story.delete" },
  async ({ event, step }) => {
    const { storyId } = event.data;
    const in24Hours = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await step.sleepUntil("wait-for-24-hours", in24Hours);
    await step.run("delete-story", async () => {
      await connectDB();
      const Story = (await import("../models/Story.js")).default;
      await Story.findByIdAndDelete(storyId);
      return { message: "Story deleted" };
    });
  }
);

// Create an empty array where we'll export future Inngest functions
export const functions = [
  syncUserCreation,
  syncUserUpdate,
  syncUserDeletion,
  sendFriendRequestReminder,
  deleteStory,
];
