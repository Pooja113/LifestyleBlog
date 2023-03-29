import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import UserModel from "../model/userModel.js";
import sendEmail from "../utils/sendEmail.js";

export const register = async (req, res, next) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    const userExist = await UserModel.findOne({ email });
    if (userExist)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({
      fname: `${firstname}`,
      lname: `${lastname}`,
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    res.status(201).json({ result, token });
  } catch (error) {
    if (error.code === 11000) {
      res.status(500).json({ message: "Username must be unique" });
    } else {
      res.status(500).json({ message: error.message });
    }
    //res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await UserModel.findOne({ email }).select("+password");
    if (!userExist)
      return res.status(404).json({ message: "User doesn't exist" });
    const checkPassword = await bcrypt.compare(password, userExist.password);

    if (!checkPassword)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { email: userExist.email, id: userExist._id },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ userExist, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const forgotpassword = async (req, res) => {
  const { email } = req.body;
  const userExist = await UserModel.findOne({ email });
  if (!userExist)
    return res.status(404).json({ message: "User doesn't exist" });

  const resetToken = crypto.randomBytes(20).toString("hex");

  userExist.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  userExist.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  await userExist.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/user/reset/${resetToken}`;
  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  try {
    await sendEmail({
      email: userExist.email,
      subject: `Learn Backend Message`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${userExist.email} successfully`,
    });
  } catch (error) {
    userExist.resetPasswordToken = undefined;
    userExist.resetPasswordExpire = undefined;
    await userExist.save({ validateBeforeSave: false });
    return res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const userExists = await UserModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!userExists) {
    return res
      .status(404)
      .json({ message: "Invalid token or token has been expired" });
  }

  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({ message: "Password doesn't match" });
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  userExists.password = hashedPassword;

  userExists.resetPasswordToken = undefined;
  userExists.resetPasswordExpire = undefined;

  await userExists.save();
  res.status(200).json({
    success: true,
    message: `Password Reset successfully`,
  });
};
