import yup from "yup";

const postSchema = yup.object({
  title: yup.string().min(8).max(30).required("Title is required"),
  description: yup.string().min(60).required("Description is required"),
  image: yup.mixed().required("Image file is required"),
});

export default postSchema;
