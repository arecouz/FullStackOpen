import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, putAnecdote } from './requests';
import { useContext } from 'react';
import NotificationContext from './NotificationContext';

const App = () => {
  const queryClient = useQueryClient();
  const [notification, notificationDispatch] = useContext(NotificationContext);

  const voteMutation = useMutation({
    mutationFn: putAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
    },
  });

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => getAnecdotes(),
    retry: false,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.error) {
    return <div>server error</div>;
  }

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    console.log(anecdote.id);
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    notificationDispatch({
      type: 'SHOW',
      payload: `you voted for ${anecdote.content}`,
    });
    setTimeout(() => notificationDispatch('HIDE'), 5000);
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <hr></hr>
          <div>{anecdote.content}</div>
          <div>
            votes: {anecdote.votes}
            <div>
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
