import mongoose from "mongoose";

const LikedbyModel = new mongoose.Schema(
  {
    postId: { type: String, required: true },
    likedby: { type: String, required: true },
  },
  { versionKey: false }
);

export default mongoose.model("LikedBy", LikedbyModel);
