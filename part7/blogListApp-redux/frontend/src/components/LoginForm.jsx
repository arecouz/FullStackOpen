import { useState } from "react";
import loginService from '../services/login';
import LoginButton from "./LoginButton";
import { setUser } from "../reducers/userReducer";
import { useDispatch } from "react-redux";

const LoginForm = ({ doNotification }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('trying: logging in with', username, password);

    try {
      const currentUser = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedAppUser', JSON.stringify(currentUser));

      dispatch(setUser(currentUser));
      doNotification('success', `hello ${username}`);
    } catch {
      console.error('error');
      if ((username === '') || (password === '')) {
        doNotification('error', 'enter username and password');
      }
      doNotification('error', 'username or password not found');
      setUsername('');
      setPassword('');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <form onSubmit={handleLogin} className="bg-yellow-400 p-6 rounded-lg shadow-md w-full max-w-xs">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <div className="form-field mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
            autoComplete="username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="form-field mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
            autoComplete="current-password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <LoginButton />
      </form>
    </div>
  );
};

export default LoginForm;
