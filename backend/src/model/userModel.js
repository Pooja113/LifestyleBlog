import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, "Please Enter First Name"],
  },
  lname: {
    type: String,
    required: [true, "Please Enter Last Name"],
  },
  username: {
    type: String,
    required: [true, "Please Enter User Name"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please Enter Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

const userModel = mongoose.model("User", UserSchema);
export default userModel;
