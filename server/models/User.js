import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: True },
    email: { type: String, required: True },
    full_name: { type: String, required: True },
    username: { type: String, unique: True }, // username must be unique from others
    bio: { type: String, default: "Hi! I am using VandyGram." },
    profile_picture: { type: String, default: "" },
    cover_photo: { type: String, default: "" },
    location: { type: String, default: "" },
    year: { type: String, default: "" },
    major: { type: String, default: "" },
    followers: [{ type: String, reference: "User" }],
    following: [{ type: String, reference: "User" }],
    friends: [{ type: String, reference: "User" }],
  },
  { timestamps: true, minimize: false }
);

const User = mongoose.model("User", userSchema);

export default User;
