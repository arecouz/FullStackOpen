import {
  View,
  ActivityIndicator,
  StyleSheet,
  Button,
  FlatList,
} from 'react-native';
import { useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import * as Linking from 'expo-linking';
import useReviews from '../hooks/useReviews';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const RepositoryInfo = ({ repository }) => {
  if (repository.loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (repository.data) {
    return (
      <View>
        <RepositoryItem item={repository.data.repository} />
        <Button
          title="Open on Github"
          color="black"
          onPress={() => Linking.openURL(repository.data.repository.url)}
        ></Button>
      </View>
    );
  }
};

const SingleRepository = () => {
  const { id } = useParams();
  const repository = useRepository(id);
  const reviews = useReviews(id);

  const reviewNodes = reviews.data
    ? reviews.data.repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  );
};

export default SingleRepository;
