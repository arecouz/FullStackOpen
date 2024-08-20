import { FlatList, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  footer: {
    height: 150, // don't know why this is necessary but it is.
    color: 'grey',
  },
});

const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      ListFooterComponent={<Text style={styles.footer}> fin </Text>}
    />
  );
};

export default RepositoryListContainer;
