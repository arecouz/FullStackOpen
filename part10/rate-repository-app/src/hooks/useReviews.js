import { GET_REVIEWS } from '../graphQl/queries';
import { useQuery } from '@apollo/client';

const useReviews = (id) => {
  const { data, loading, error, fetchMore } = useQuery(GET_REVIEWS, {
    variables: { repositoryId: id, first: 2 },
    fetchPolicy: 'cache-and-network',
    // Other options
  });

  const handleFetchMore = () => {
    console.log('hook: fetch more top called');
    const canFetchMore =
      !loading && data?.repository?.reviews?.pageInfo?.hasNextPage;
    if (!canFetchMore) {
      console.log(data?.repository?.reviews.pageInfo.hasNextPage);
      return;
    }
    console.log('hook: fetch more');
    console.log(data?.repository?.reviews.pageInfo.endCursor)
    fetchMore({
      variables: {
        after: data?.repository?.reviews.pageInfo.endCursor,
        repositoryId: id,
      },
    });
  };

  return { data, loading, error, fetchMore: handleFetchMore };
};

export default useReviews;
