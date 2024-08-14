import { GET_REVIEWS } from '../graphQl/queries';
import { useQuery } from '@apollo/client';

const useReviews = (id) => {
  const { data, loading, error } = useQuery(GET_REVIEWS, {
    variables: { repositoryId: id },
    fetchPolicy: 'cache-and-network',
    // Other options
  });
  return { data, loading, error };
};

export default useReviews;
