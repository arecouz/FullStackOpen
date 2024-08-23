import { GET_REPOSITORIES } from '../graphQl/queries';
import { useQuery } from '@apollo/client';

const useRepositories = (searchKeyword) => {
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { searchKeyword },
  });

  return { data, loading, error };
};

export default useRepositories;
