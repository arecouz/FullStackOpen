import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Text from './Text';
import useRepositories from '../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';
import OrderSelectionMenu from './OrderSelectionMenu';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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

  const repositories = data.repositories;

  return (
    <View>
      <OrderSelectionMenu />
      <RepositoryListContainer repositories={repositories} />
    </View>
  );
};

export default RepositoryList;
