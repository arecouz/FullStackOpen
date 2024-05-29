import { useSelector, useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { createNotification, removeNotification } from '../reducers/notificationReducer';
import { waitFor } from '@testing-library/react';

const AnecdotesList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const userFilter = useSelector((state) => state.filter);

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);
  const filteredAnecdotes = sortedAnecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(userFilter.toLowerCase())
  );

  const dispatch = useDispatch();

  const handleVote = (id) => {
    console.log('AAA: ', anecdotes);
    const thisAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
    console.log('this: ', thisAnecdote);
    dispatch(vote(id));
    dispatch(createNotification(`you voted this ${thisAnecdote.content}`));
    setTimeout(() => dispatch(removeNotification()), 5000);
  };

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <br></br>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
          <hr></hr>
        </div>
      ))}
    </div>
  );
};

export default AnecdotesList;
