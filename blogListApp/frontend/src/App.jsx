import { useEffect, useState } from 'react';
import axios from 'axios';
import LoginButton from './components/LoginButton';
import loginService from './services/login';
import LogoutButton from './components/LogoutButton';

const App = () => {
  const baseUrl = '/api/blogs';
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const [notification, setNotification] = useState({ type: '', message: '' });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }

    axios.get(baseUrl).then((response) => {
      setBlogs(response.data);
    });
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

      setUser(user);
      setNotification({ type: 'success', message: `Hi, ${user.username}!` });
    } catch {
      if ((username === '') | (password === '')) {
        doNotification('error', 'enter username and password');
      }
      doNotification('error', 'username or password not found');
      setUsername('');
      setPassword('');
    }
  };

  const doNotification = (type, message) => {
    setNotification({ type: type, message: message });
    setTimeout(() => {
      setNotification({ type: 'hidden', message: 'hidden' });
    }, 2500);
  };

  const handleCreateNewBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };
    try {
      const response = await axios.post(baseUrl, newBlog, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setBlogs([...blogs, response.data]);
      setTitle('');
      setAuthor('');
      setUrl('');
      doNotification('success', `'${title}' added!`);
    } catch (error) {
      doNotification('error', 'Post failed, try again');
      console.log(error);
    }
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

  const blogsList = () => (
    <ul>
      {blogs.map((blog) => (
        <li key={blog.id}>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.title}
          </a>
        </li>
      ))}
    </ul>
  );

  const blogForm = () => (
    <form onSubmit={handleCreateNewBlog}>
      <div className="form-field">
        <label>New Blog</label>
        <input
          type="text"
          value={title}
          name="title"
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div className="form-field">
        <label>Author</label>
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div className="form-field">
        <label>url</label>
        <input
          type="text"
          value={url}
          name="author"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button>post</button>
    </form>
  );

  if (user === null) {
    return (
      <div>
        <h1>Blogs List</h1>
        <p className={`notification ${notification.type}`}>
          {notification.message}
        </p>
        {loginForm()}
      </div>
    );
  }

  console.log('username: ', username);
  return (
    <>
      <h1> Blogs List</h1>
      <div className="user-info">
        <h2>{user.username}</h2>
        <LogoutButton setUser={setUser} doNotification={doNotification} />
      </div>
      <p className={`notification ${notification.type}`}>
        {notification.message}
      </p>
      {blogForm()}
      <br></br>
      {blogsList()}
    </>
  );
};

export default App;
