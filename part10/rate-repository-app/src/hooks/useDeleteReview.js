import { useMutation, useApolloClient } from '@apollo/client';
import { DELETE_REVIEW } from '../graphQl/mutation';

const useReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);
  const apolloClient = useApolloClient()

  const deleteReview = async (id) => {
    const result =  await mutate({ variables: { deleteReviewId: id } });
    apolloClient.resetStore()
    return result
  };

  return [deleteReview, result];
};

export default useReview;
