import { FlatList, View, StyleSheet, Button, Alert } from 'react-native';
import ReviewItem from './ReviewItem';
import useMyReview from '../hooks/useMyReviews';
import useDeleteReview from '../hooks/useDeleteReview';
import theme from '../theme';
import Text from './Text';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  reviewContainer: {
    flex: 3,
    padding: 15,
  },
  headingText: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.heading,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttons: {
    justifyContent: 'center',
  },
  button: {
    padding: 3,
    marginRight: 9,
    justifyContent: 'center',
    alignContent: 'center',
  },
  noReviewsContainer: {
    padding: 25,
    alignItems: 'center',
  },
});

const MyReviews = () => {
  const [deleteReview] = useDeleteReview();
  const navigate = useNavigate();
  const { data, fetchMore, refetch } = useMyReview({
    first: 5,
  });

  const reviewNodes = data?.me?.reviews?.edges
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  const handleDelete = async (id) => {
    try {
      const response = await deleteReview(id);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onEndReach = () => {
    if (data?.me?.reviews?.pageInfo.hasNextPage) {
      fetchMore();
    }
  };

  return reviewNodes.length > 0 ? (
    <FlatList
      data={reviewNodes}
      onEndReached={onEndReach}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <View style={styles.reviewContainer}>
            <View style={styles.headingContainer}>
              <Text style={styles.headingText}>
                {item?.repository?.name || 'No repository name'}
              </Text>
            </View>
            <ReviewItem review={item} />
          </View>
          <View style={styles.buttons}>
            <View style={styles.button}>
              <Button
                title="view"
                color="black"
                onPress={() => navigate(`/${item.repository.id}`)}
              ></Button>
            </View>
            <View style={styles.button}>
              <Button
                title="delete"
                color="red"
                onPress={() =>
                  Alert.alert(
                    `Delete?`,
                    `Are you sure you want to remove your review of ${item.repository.name}?`,
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {
                        text: 'Delete',
                        onPress: () => {
                          handleDelete(item.id), refetch();
                        },
                      },
                    ]
                  )
                }
              ></Button>
            </View>
          </View>
        </View>
      )}
    />
  ) : (
    <View style={styles.noReviewsContainer}>
      <Text style={styles.headingText}>You currently have no reviews</Text>
    </View>
  );
};

export default MyReviews;
