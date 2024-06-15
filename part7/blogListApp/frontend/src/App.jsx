import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import LoginButton from './components/LoginButton';
import loginService from './services/login';
import LogoutButton from './components/LogoutButton';
import BlogForm from './components/BlogForm';
import BlogsList from './components/BlogsList';
import blogService from './services/blogs';
import Toggleable from './components/Toggleable';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNotification,
  removeNotification,
} from './reducers/notificationReducer';
import { initializeBlogs, editBlog, removeBlog } from './reducers/blogsReducer';
import { setUser } from './reducers/userReducer';

const App = () => {
  const baseUrl = '/api/blogs';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector(state => state.user)
  const _notification = useSelector((state) => state.notification);
  const _blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();

  const noteFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
    }

    blogService.getAll().then((blogs) => dispatch(initializeBlogs(blogs)));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('trying: logging in with', username, password);

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedAppUser', JSON.stringify(user));

      dispatch(setUser(user));
      doNotification('success', `hello, ${user.username}!`);
    } catch {
      if ((username === '') | (password === '')) {
        doNotification('error', 'enter username and password');
      }
      doNotification('error', 'username/password not found');
      setUsername('');
      setPassword('');
    }
  };

  const doNotification = (type, message) => {
    dispatch(createNotification({ type, message }));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 2500);
  };


  const deleteBlog = async (blogID) => {
    console.log(_blogs);
    const blogToDelete = _blogs.find((blog) => blog.id === blogID);
    console.log('delete? : ', blogToDelete);
    if (
      window.confirm(`are you sure you want to delete '${blogToDelete.title}'?`)
    )
      try {
        const response = await axios.delete(`${baseUrl}/${blogID}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        dispatch(removeBlog(blogID));
        doNotification('success', `${blogToDelete.title} successfully deleted`);
      } catch (error) {
        doNotification('error', 'delete failed, try again');
        console.log(error);
      }
  };

  const incrementLikes = async (blogID) => {
    const blogToUpdate = _blogs.find((blog) => blog.id === blogID);
    console.log('222 ', blogToUpdate);
    const response = await axios.put(`${baseUrl}/${blogID}`, {
      likes: blogToUpdate.likes + 1,
    });
    dispatch(editBlog({ id: blogID, edit: response.data }));
  };

  const loginForm = () => (
    <form onSubmit={handleLogin} className="login-form">
      <div className="form-field">
        <label>Username</label>
        <input
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
          autoComplete="username"
        />
      </div>
      <div className="form-field">
        <label>Password</label>
        <input
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
          autoComplete="current-password"
        />
      </div>
      <LoginButton />
    </form>
  );

  if (user === null) {
    return (
      <div>
        <h1>Blogs List</h1>
        <p className={`notification ${_notification.type}`}>
          {_notification.message}
        </p>
        {loginForm()}
      </div>
    );
  }

  return (
    <>
      <h1> Blogs List</h1>
      <div className="user-info">
        <h2>{user.username}</h2>
        <LogoutButton
          setUser={setUser}
          doNotification={doNotification}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </div>
      <p className={`notification ${_notification.type}`}>
        {_notification.message}
      </p>
      <Toggleable buttonLabel={'Add  blog'} ref={noteFormRef}>
        <BlogForm></BlogForm>
      </Toggleable>
      <br></br>
      <BlogsList
        blogs={_blogs}
        incrementLikes={incrementLikes}
        handleBlogDelete={deleteBlog}
        user={user}
      ></BlogsList>
    </>
  );
};

export default App;
