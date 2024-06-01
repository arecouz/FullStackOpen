import axios from 'axios';

const dbUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(dbUrl);
  return response.data;
};

const createNew = async (content) => {
  const obj = { content, votes: 0 };
  const response = await axios.post(dbUrl, obj);
  return response.data;
};

const doVote = async (id) => {
  const initialAnecdoteResponse = await axios.get(`${dbUrl}/${id}`);
  const initialAnecdote = initialAnecdoteResponse.data;
  const updatedAnecdote = {
    ...initialAnecdote,
    votes: initialAnecdote.votes + 1,
  };
  const response = await axios.put(`${dbUrl}/${id}`, updatedAnecdote);
  return response.data;
};

export default { getAll, createNew, doVote };
