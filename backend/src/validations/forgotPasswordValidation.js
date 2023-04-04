import yup from "yup";

const forgotpassValidation = yup.object({
  email: yup.string().email("Must be a valid email").required(),
});

export default forgotpassValidation;
