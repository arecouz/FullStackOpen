import { useSelector, useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { createNotification } from '../reducers/notificationReducer';

const AnecdotesList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const userFilter = useSelector((state) => state.filter);

  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);
  console.log('sorted', sortedAnecdotes);
  const filteredAnecdotes = sortedAnecdotes.filter((anecdote) => {
    return anecdote.content.toLowerCase().includes(userFilter.toLowerCase());
  });

  const dispatch = useDispatch();

  const handleVote = (anecdote) => {
    dispatch(vote(anecdote));
    dispatch(createNotification(anecdote.content, 5000));
  };

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <br></br>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
          <hr></hr>
        </div>
      ))}
    </div>
  );
};

export default AnecdotesList;
