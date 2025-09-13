import mongoose from "mongoose";

const friendSchema = new mongoose.Schema(
  {
    from_user_id: { type: String, ref: "User", required: true },
    to_user_id: { type: String, ref: "User", required: true },
    status: { type: String, enum: ["pending", "accepted"], default: "pending" },
  },
  { timestamps: true }
);

const Friend = mongoose.model("Friend", friendSchema);

export default Friend;
