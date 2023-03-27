import mongoose from "mongoose";

const PostModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Enter title"],
    },
    description: {
      type: String,
      required: [true, "Please Enter the description"],
    },
    image: { type: String },
    likes: { type: Number, default: 0 },
    comments: { type: [String] },
  },
  { versionKey: false }
);

export default mongoose.model("Post", PostModel);
