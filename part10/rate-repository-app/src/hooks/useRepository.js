import { GET_REPOSITORY } from '../graphQl/queries';
import { useQuery } from '@apollo/client';

const useRepository = (id) => {
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
    fetchPolicy: 'cache-and-network',
    // Other options
  });
  return { data, loading, error };
};

export default useRepository;
