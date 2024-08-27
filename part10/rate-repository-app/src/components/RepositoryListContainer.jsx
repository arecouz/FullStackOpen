import { FlatList, StyleSheet, View } from 'react-native';
import RepositorySearchBar from './RepositorySearchBar';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  footer: {
    height: 175, // don't know why this is necessary but it is.
  },
});

const RepositoryListContainer = ({
  repositories,
  searchQuery,
  setSearchQuery,
  onEndReach,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      ListHeaderComponent={
        <RepositorySearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      }
      ListFooterComponent={<View style={styles.footer}></View>}
      onEndReached={onEndReach}
    />
  );
};

export default RepositoryListContainer;
