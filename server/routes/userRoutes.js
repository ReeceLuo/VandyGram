import express from "express";
import {
  acceptFriendRequest,
  discoverUsers,
  followUser,
  getUserData,
  getUserFriends,
  sendFriendRequest,
  unfollowUser,
  updateUserData,
} from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";
import { upload } from "../configs/multer.js";

const userRouter = express.Router();

// User routes
userRouter.get("/data", protect, getUserData);
userRouter.post(
  "/update",
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  protect,
  updateUserData
);
userRouter.post("/discover", protect, discoverUsers);
userRouter.post("/follow", protect, followUser);
userRouter.post("/unfollow", protect, unfollowUser);

// Friend routes
userRouter.post("/friend", protect, sendFriendRequest);
userRouter.post("/accept", protect, acceptFriendRequest);
userRouter.get("/connections", protect, getUserFriends);

export default userRouter;
