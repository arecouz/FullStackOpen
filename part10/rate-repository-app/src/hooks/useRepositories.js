import { GET_REPOSITORIES } from '../graphQl/queries';
import { useQuery } from '@apollo/client';

const useRepositories = (variables) => {
  const { data, loading, error, fetchMore } = useQuery(
    GET_REPOSITORIES,
    {fetchPolicy: 'cache-and-network', variables}
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables
      },
    });
  };

  return { data, loading, error, fetchMore: handleFetchMore };
};

export default useRepositories;
