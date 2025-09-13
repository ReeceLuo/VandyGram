import { Inngest } from "inngest";
import connectDB from "../configs/db.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "my-app" });

//user.created, user.updated, user.deleted are all events from clerk webhooks

// ingest function to save user data from clerk to database
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();

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

    const { id } = event.data;
    await User.findByIdAndDelete(id);
  }
);

// Create an empty array where we'll export future Inngest functions
export const functions = [syncUserCreation, syncUserUpdate, syncUserDeletion];
