import { GET_REPOSITORIES_HIGHEST_RATED } from '../graphQl/queries';
import { useQuery } from '@apollo/client';

const useRepositoriesHighestRated = (searchKeyword) => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES_HIGHEST_RATED, {
    fetchPolicy: 'cache-and-network',
    variables: { searchKeyword },
    // Other options
  });
  return { data, loading, error };
};

export default useRepositoriesHighestRated;
