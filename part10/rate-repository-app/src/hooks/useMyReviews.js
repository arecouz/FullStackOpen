import { ME } from '../graphQl/queries';
import { useQuery } from '@apollo/client';

const useMyReviews = (variables) => {
  const { data, loading, error, fetchMore, refetch } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true, ...variables },
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      console.log('cant fetch more');
      return;
    }
    fetchMore({
      variables: {
        after: data.me.reviews.pageInfo.endCursor,
        includeReviews: true,
        ...variables,
      },
    });
  };

  return { data, loading, error, fetchMore: handleFetchMore, refetch };
};

export default useMyReviews;
