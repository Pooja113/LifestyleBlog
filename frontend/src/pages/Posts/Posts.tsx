import Post from "../../components/Post/Post";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {getPosts} from "../../actions/posts";
const Posts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);
  return (
    <div>
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Posts;
