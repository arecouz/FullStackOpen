import { useMutation } from '@tanstack/react-query';
import { postAnecdote } from '../requests';
import { useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import NotificationContext from '../NotificationContext';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const [notification, notificationDispatch] = useContext(NotificationContext);

  const createAnecdoteMutation = useMutation({
    mutationFn: postAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
      notificationDispatch({ type: 'SHOW', payload: 'new blog added' });
      setTimeout(() => notificationDispatch('HIDE'), 5000);
    },
    onError: () => {
      notificationDispatch({
        type: 'SHOW',
        payload: 'NOT ADDED. Must be at least 5 characters, try again!',
      });
      setTimeout(() => notificationDispatch('HIDE'), 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    createAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
