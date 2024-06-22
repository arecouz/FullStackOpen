import { useEffect, useState, useRef } from "react";
import LogoutButton from "./components/LogoutButton";
import BlogForm from "./components/BlogForm";
import BlogsList from "./components/BlogsList";
import Toggleable from "./components/Toggleable";
import LoginForm from "./components/LoginForm";
import BlogPage from "./components/BlogPage";
import UserPage from "./components/UserPage";
import User from "./components/User";
import usersServices from "./services/users";
import { useDispatch, useSelector } from "react-redux";
import {
  createNotification,
  hideNotification,
} from "./reducers/notificationReducer";
import {
  initializeBlogs,
  createBlog,
  deleteBlog,
  editBlog,
  setBlogs,
} from "./reducers/blogsReducer";
import { setUser, removeUser } from "./reducers/userReducer";
import { Route, Routes, Link, useNavigate } from "react-router-dom";

const App = () => {
  const [, setUsername] = useState("");
  const [, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const noteFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedAppUser");
    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON);
      dispatch(setUser(currentUser));
    }
    dispatch(initializeBlogs());
    usersServices.getAll().then((response) => setUsers(response));
    console.log("users: ", users);
  }, [dispatch]);

  const doNotification = (type, message) => {
    dispatch(createNotification({ type, message }));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 2500);
  };

  const addBlog = async (blogObject) => {
    try {
      dispatch(
        createBlog(blogObject, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
      );
      doNotification("success", `'${blogObject.title}' added!`);
    } catch (error) {
      doNotification("error", "Post failed, try again");
      console.log(error);
    }
  };

  const handleDeleteBlog = async (blogID) => {
    const blogToDelete = blogs.find((blog) => blog.id === blogID);
    if (
      window.confirm(`are you sure you want to delete '${blogToDelete.title}'?`)
    )
      try {
        dispatch(
          deleteBlog(blogID, {
            headers: { Authorization: `Bearer ${user.token}` },
          })
        );
        doNotification("success", `${blogToDelete.title} successfully deleted`);
      } catch (error) {
        doNotification("error", "delete failed, try again");
        console.log(error);
      }
  };

  const handleIncrementLikes = async (blogID) => {
    try {
      const blogToUpdate = blogs.find((blog) => blog.id === blogID);
      dispatch(editBlog(blogID, { likes: blogToUpdate.likes + 1 }));
    } catch (error) {
      console.error;
    }
  };

  const Home = () => (
    <div className="space-y-3">
      <Toggleable buttonLabel={"Add  blog"} ref={noteFormRef}>
        <BlogForm handleAddNewBlog={addBlog}></BlogForm>
      </Toggleable>
      <BlogsList
        blogs={blogs}
        handleBlogDelete={handleDeleteBlog}
        user={user}
      ></BlogsList>
    </div>
  );

  if (user === null) {
    return (
      <div>
        <p className="bg-black text-3xl text-white flex items-center justify-center h-full">
          {notification.message}
        </p>
        <LoginForm doNotification={doNotification}></LoginForm>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen p-4 text-white">
      <div className="flex">
        <h1 className="text-3xl font-bold underline text-yellow-400 space-x-6">
          Blogs List
        </h1>
        <div className="space-x-9 pl-8">
          <Link to="/" className="text-yellow-400 hover:text-white underline">
            Blogs
          </Link>
          <Link
            to="/users"
            className="text-yellow-400 hover:text-white underline"
          >
            Users
          </Link>
        </div>
      </div>
      <div className="user-info flex items-center space-x-2 text-yellow-400 py-6">
        <h2>{user.username}: </h2>
        <LogoutButton
          doNotification={doNotification}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
      <p className={`notification ${notification.type}`}>
        {notification.message}
      </p>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users/:id" element={<User users={users} />} />
        <Route path="/users" element={<UserPage users={users} />} />
        <Route
          path="/blogs/:id"
          element={<BlogPage incrementLikes={handleIncrementLikes} />}
        />
      </Routes>
    </div>
  );
};

export default App;
