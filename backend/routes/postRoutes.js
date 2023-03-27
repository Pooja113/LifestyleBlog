import express from "express";
import {
  commentPost,
  createPosts,
  deletePost,
  getPostDetails,
  getPosts,
  likePost,
  updatePost,
} from "../controllers/postController.js";
import validation from "../middlewares/validation.js";
import postSchema from "../validations/postValidation.js";

const router = express.Router();

router.post("/create", validation(postSchema), createPosts);
router.get("/all", getPosts);
router.get("/:id", getPostDetails);
router.put("/like/:id", likePost);
router.post("/:id", validation(postSchema), updatePost);
router.delete("/:id", deletePost);
router.post("/comment/:id", commentPost);

export default router;
