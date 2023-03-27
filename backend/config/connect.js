import mongoose from "mongoose";

const connectDB = (url) => {
  mongoose.set("strictQuery", false);

  mongoose
    .connect(url)
    .then(() => {
      console.log(`Mongodb connected`);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connectDB;
