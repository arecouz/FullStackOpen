import React from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import Text from './Text';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const RepositoryList = () => {
  const { data, loading, error } = useRepositories();

  if (error) {
    return (
      <View>
        <Text>error: {error.message}</Text>
        <Text>
          if ip has changed update that, and clear cache (npx expo start
          --clear)
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const repositoryNodes = data
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RepositoryList;
