import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connect.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cloudinary from "cloudinary";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("working");
});

app.use("/user", userRoutes);
app.use("/post", postRoutes);

connectDB(process.env.MONGODB_URL);
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const server = app.listen(process.env.PORT, () => {
  console.log(`Server start at http://localhost:${process.env.PORT}`);
});
