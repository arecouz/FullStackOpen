import { useEffect, useState, useRef } from 'react';
import LogoutButton from './components/LogoutButton';
import BlogForm from './components/BlogForm';
import BlogsList from './components/BlogsList';
import Toggleable from './components/Toggleable';
import LoginForm from './components/LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNotification,
  hideNotification,
} from './reducers/notificationReducer';
import {
  initializeBlogs,
  createBlog,
  deleteBlog,
  editBlog,
} from './reducers/blogsReducer';
import { setUser, removeUser } from './reducers/userReducer';


const App = () => {
  const [, setUsername] = useState('');
  const [, setPassword] = useState('');

  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const noteFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const currentUser = JSON.parse(loggedUserJSON);
      dispatch(setUser(currentUser))
    }
    dispatch(initializeBlogs());
  }, [dispatch]);

  const doNotification = (type, message) => {
    dispatch(createNotification({ type, message }));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 2500);
  };

  const addBlog = async (blogObject) => {
    noteFormRef.current.switchToggle();
    try {
      dispatch(
        createBlog(blogObject, {
          headers: { Authorization: `Bearer ${user.token}` },
        })
      );
      doNotification('success', `'${blogObject.title}' added!`);
    } catch (error) {
      doNotification('error', 'Post failed, try again');
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
        doNotification('success', `${blogToDelete.title} successfully deleted`);
      } catch (error) {
        doNotification('error', 'delete failed, try again');
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

  if (user === null) {
    return (
      <div>
        <h1>Blogs List</h1>
        <p className={`notification ${notification.type}`}>
          {notification.message}
        </p>
        <LoginForm
          doNotification={doNotification}
        ></LoginForm>
      </div>
    );
  }

  return (
    <>
      <h1> Blogs List</h1>
      <div className="user-info">
        <h2>{user.username}</h2>
        <LogoutButton
          doNotification={doNotification}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
      <p className={`notification ${notification.type}`}>
        {notification.message}
      </p>
      <Toggleable buttonLabel={'Add  blog'} ref={noteFormRef}>
        <BlogForm handleAddNewBlog={addBlog}></BlogForm>
      </Toggleable>
      <br></br>
      <BlogsList
        blogs={blogs}
        incrementLikes={handleIncrementLikes}
        handleBlogDelete={handleDeleteBlog}
        user={user}
      ></BlogsList>
    </>
  );
};

export default App;
