import { useState } from "react";
import loginService from '../services/login'
import LoginButton from "./LoginButton";
import { setUser } from "../reducers/userReducer";
import { useDispatch } from "react-redux";

const LoginForm = ({doNotification}) => {
    const dispatch = useDispatch()
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
          console.error('error')
          if ((username === '') | (password === '')) {
            doNotification('error', 'enter username and password');
          }
          doNotification('error', 'username or password not found');
          setUsername('');
          setPassword('');
        }
      };

  return (
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
};

export default LoginForm;
