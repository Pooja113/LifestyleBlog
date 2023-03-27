import yup from "yup";
const userSchema = yup.object({
  firstname: yup.string().required("FirstName is required"),
  lastname: yup.string().required("Last Name is required"),
  username: yup.string().required("UserName is required"),
  email: yup.string().email("Must be a valid email").required(),
  password: yup.string().required("password is required"),
});

export default userSchema;
