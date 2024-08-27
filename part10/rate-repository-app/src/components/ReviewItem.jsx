import { format } from 'date-fns';
import { View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 12,
    borderBottomWidth: 1,
    paddingBottom: 30,
    borderBottomColor: 'black',
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'column',
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});

const ReviewItem = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), 'MMMM dd, yyyy');

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <View style={styles.userInfo}>
          <Text fontWeight="bold">{review.user.username}</Text>
          <Text>{formattedDate}</Text>
        </View>

        <View style={styles.ratingContainer}>
          <Text>{review.rating}</Text>
        </View>
      </View>

      <Text>{review.text}</Text>
    </View>
  );
};

export default ReviewItem;
