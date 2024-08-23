import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Text from './Text';
import useRepositories from '../hooks/useRepositories';
import useRepositoriesHighestRated from '../hooks/useRepositoriesHighestRated';
import useRepositoriesLowestRated from '../hooks/useRepositoriesLowestRated';
import RepositoryListContainer from './RepositoryListContainer';
import OrderSelectionMenu from './OrderSelectionMenu';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch] = useDebounce(searchQuery, 500)

  let dataHook;
  switch (selectedOrder) {
    case 'highestRated':
      dataHook = useRepositoriesHighestRated(debouncedSearch);
      break;
    case 'lowestRated':
      dataHook = useRepositoriesLowestRated(debouncedSearch);
      break;
    case 'latest':
      dataHook = useRepositories(debouncedSearch);
      break;
    default:
      dataHook = useRepositories(debouncedSearch);
  }

  const { data, loading, error } = dataHook;

  if (error) {
    return (
      <View>
        <Text>error: {error.message}</Text>
        <Text>
          if IP has changed, update that and clear cache (npx expo start
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
      <OrderSelectionMenu
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
      />
      <RepositoryListContainer
        repositories={repositories}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    </View>
  );
};

export default RepositoryList;
