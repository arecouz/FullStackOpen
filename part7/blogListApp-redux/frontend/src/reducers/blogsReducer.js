import { createSlice } from '@reduxjs/toolkit';
import blogsService from '../services/blogs';

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
    updateBlog(state, action) {
      const id = action.payload.id;
      const update = action.payload.update;
      return state.map((blog) => (blog.id !== id ? blog : {...blog, ...update}));
    },
  },
});

export const { setBlogs, appendBlog, removeBlog, updateBlog } =
  blogsSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogsService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog, authorization) => {
  return async (dispatch) => {
    const created = await blogsService.addNew(blog, authorization);
    dispatch(appendBlog(created));
  };
};

export const deleteBlog = (id, authorization) => {
  return async (dispatch) => {
    const deleted = await blogsService.deleteBlog(id, authorization);
    dispatch(removeBlog(id));
  };
};

export const editBlog = (id, edit) => {
  return async (dispatch) => {
    const edited = await blogsService.editBlog(id, edit);
    dispatch(updateBlog({id, update: edited}));
  };
};

export default blogsSlice.reducer;
