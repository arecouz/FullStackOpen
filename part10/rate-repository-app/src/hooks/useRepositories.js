import { GET_REPOSITORIES } from '../graphQl/queries';
import { useQuery } from '@apollo/client';

const useRepositories = () => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    // Other options
  });
  return { data, loading, error };
};

export default useRepositories;
