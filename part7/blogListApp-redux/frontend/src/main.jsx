import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notificationReducer';
import blogsReducer from './reducers/blogsReducer.js';
import userReducer from './reducers/userReducer.js';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
