import yup from "yup";

const loginValidation = yup.object({
  email: yup.string().email("Must be a valid email").required(),
  password: yup.string().required("password is required"),
});

export default loginValidation;
