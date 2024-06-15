import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { act } from 'react';

const baseUrl = '/api/blogs';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    initializeBlogs(state, action) {
      return action.payload;
    },
    createBlog(state, action) {
      state.push({
        title: action.payload.title,
        author: action.payload.author,
        url: action.payload.url,
        likes: 0,
        user: 'blank',
      });
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    editBlog(state, action) {
      console.log('payload: ', action.payload);
      const blog = state.find((b) => b.id === action.payload.id);
      const newBlog = {
        ...blog,
        ...action.payload.edit,
      };
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : newBlog
      );
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.data)
    },
  },
});

export const { initializeBlogs, createBlog, appendBlog, editBlog, removeBlog } =
  blogsSlice.actions;
export default blogsSlice.reducer;
