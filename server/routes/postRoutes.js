import express from "express";
import {
  addPost,
  getComments,
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
postRouter.get("/comments", protect, getComments);

export default postRouter;
