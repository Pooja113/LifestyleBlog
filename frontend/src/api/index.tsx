import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });

export const createPosts = (newPost: any) => API.post("/post", newPost);
export const fetchPosts = () => API.get("/post");
