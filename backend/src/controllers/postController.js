import PostModel from "../model/postModel.js";
import LikedBy from "../model/likedbyModel.js";
import cloudinary from "cloudinary";

export const createPosts = async (req, res) => {
  try {
    const { title, description, image } = req.body;

    const img = await cloudinary.uploader.upload(image);

    const result = await PostModel.create({
      title,
      description,
      image: img.url,
    });
    return res
      .status(201)
      .json({ result, message: "Post Created Successfully" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    return res.status(200).json({ posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostModel.findById(id);
    if (!post) {
      res.status(404).json({ message: "No Posts with this id" });
    }

    const updatePost = await PostModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({ updatePost, message: "Post Edited" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "No Posts with this id" });
    }
    await post.deleteOne({ id });
    res.status(200).json({ message: "Post Deleted Successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPostDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await PostModel.findById(id);
    return res.status(200).json({ post });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const post = await PostModel.findById(id);
    if (!post) {
      res.status(404).json({ message: "No Posts with this id" });
    } else {
      const existed = await LikedBy.findOne({ postId: id, likedby: email });
      if (!existed) {
        const likePost = await PostModel.findByIdAndUpdate(id, {
          likes: post.likes + 1,
        });
        const likedBy = await LikedBy.create({
          postId: id,
          likedby: email,
        });

        return res.status(200).json({ likePost, likedBy });
      } else {
        res.status(200).json({ message: "Already liked" });
      }
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const commentPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;
    const post = await PostModel.findById(id);
    if (!post) {
      res.status(404).json({ message: "No Posts with this id" });
    } else {
      post.comments.push(value);
      const updateComment = await PostModel.findByIdAndUpdate(id, post);
      return res.status(200).json({ updateComment });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
