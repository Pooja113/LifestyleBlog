import Posts from "./pages/Posts/Posts";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CreatePost from "./pages/CreatePost/CreatePost";
import Header from "./components/Header/Header";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Header />
          <CreatePost />  
          <Posts />
          {/* <Link to="about">About Us</Link> */}
        </>
      ),
    },
    {
      path: "createpost",
      element: <CreatePost />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
