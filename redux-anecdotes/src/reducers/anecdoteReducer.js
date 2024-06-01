import { createSlice, current } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },

    appendAnecdote(state, action) {
      state.push(action.payload);
    },

    updateAnecdotes(state, action) {
      const newAnecdote = action.payload
      const oldAnecdote = state.find((a) => a.id === newAnecdote.id);
      return state.map(a => a.id !== newAnecdote.id ? a : newAnecdote)
    },
  },
});

export const { setAnecdotes, appendAnecdote, updateAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const vote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.doVote(anecdote.id);
    dispatch(updateAnecdotes(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;
