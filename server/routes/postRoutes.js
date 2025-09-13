import express from "express";
import { addPost, getFeedPosts, likePost } from "../controllers/postController";

const postRouter = express.Router();
postRouter.post("/add", upload.array("images", 4), protect, addPost);
postRouter.get("/feed", protect, getFeedPosts);
postRouter.post("/like", protect, likePost);

export default postRouter;
