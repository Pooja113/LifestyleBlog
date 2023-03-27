import yup from "yup";

const postSchema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup.string().required("Description is required"),
});

export default postSchema;
