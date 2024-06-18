import React from 'react';
import { removeUser } from '../reducers/userReducer';
import { useDispatch } from 'react-redux';

const LogoutButton = ({ doNotification, setUsername, setPassword}) => {
  const LogoutButtonStyle = {
    "width": "78px",
    "borderRadius": "8px",
    "border": "1px solid transparent",
    "fontSize": "1em",
    "fontWeight": "500",
   " fontFamily": "inherit",
    "backgroundColor": "#464646",
    "cursor": "pointer",
    "marginTop": "1px",
    "padding" : "0px 9px"
  };

  const LogoutButtonHoverStyle = {
    backgroundColor: 'darkred',
  };

  const [isHovered, setIsHovered] = React.useState(false);

  const dispatch = useDispatch()

  return (
    <button
      style={
        isHovered
          ? { ...LogoutButtonStyle, ...LogoutButtonHoverStyle }
          : LogoutButtonStyle
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        console.log('logout');
        window.localStorage.clear()
        dispatch(removeUser())
        setUsername('')
        setPassword('')
        doNotification("hidden", "hidden")
      }}
    >
      logout
    </button>
  );
};

export default LogoutButton;
