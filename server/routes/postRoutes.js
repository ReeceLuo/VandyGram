import express from "express";
import {
  addPost,
  getFeedPosts,
  leaveComment,
  likePost,
} from "../controllers/postController.js";
import { upload } from "../configs/multer.js";
import { protect } from "../middleware/auth.js";

const postRouter = express.Router();
postRouter.post("/add", upload.array("images", 4), protect, addPost); // Add up to 4 images
postRouter.get("/feed", protect, getFeedPosts);
postRouter.post("/like", protect, likePost);
postRouter.post("/comment", protect, leaveComment);

export default postRouter;
