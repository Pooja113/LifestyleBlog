import express from "express";
const router = express.Router();
import {
  login,
  register,
  forgotpassword,
  resetPassword,
} from "../controllers/userController.js";
import validation from "../middlewares/validation.js";
import forgotpassValidation from "../validations/forgotPasswordValidation.js";
import loginValidation from "../validations/loginValidation.js";
import userSchema from "../validations/userValidation.js";

router.post("/login", validation(loginValidation), login);
router.post("/register", validation(userSchema), register);
router.post(
  "/forgotpassword",
  validation(forgotpassValidation),
  forgotpassword
);
router.put("/reset/:token", resetPassword);

export default router;
