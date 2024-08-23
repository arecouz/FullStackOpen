import { GET_REPOSITORIES_LOWEST_RATED } from '../graphQl/queries';
import { useQuery } from '@apollo/client';

const useRepositoriesLowestRated = (searchKeyword) => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES_LOWEST_RATED, {
    fetchPolicy: 'cache-and-network',
    variables: { searchKeyword },

    // Other options
  });
  return { data, loading, error };
};

export default useRepositoriesLowestRated;
