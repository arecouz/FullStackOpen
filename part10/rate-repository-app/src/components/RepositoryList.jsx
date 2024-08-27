import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Text from './Text';
import useRepositories from '../hooks/useRepositories';
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
  const [debouncedSearch] = useDebounce(searchQuery, 500);

  let dataHook;
  switch (selectedOrder) {
    case 'highestRated':
      console.log('highest rated');
      dataHook = useRepositories({
        first: 5,
        searchKeyword: debouncedSearch,
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'DESC',
      });
      break;
    case 'lowestRated':
      dataHook = useRepositories({
        first: 5,
        searchKeyword: debouncedSearch,
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'ASC',
      });
      break;
    case 'latest':
      dataHook = useRepositories({
        first: 5,
        searchKeyword: debouncedSearch,
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC'
      });
      break;
    default:
      dataHook = useRepositories({
        first: 5,
        searchKeyword: debouncedSearch,
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC'
      });
  }

  const { data, loading, error, fetchMore } = dataHook;

  if (error) {
    return (
      <View>
        <Text>error: {error.message}</Text>
        <Text>
          If IP has changed, update that and clear cache (npx expo start
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

  const onEndReach = () => {
    if (repositories?.pageInfo?.hasNextPage) {
      fetchMore();
    }
  };

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
        onEndReach={onEndReach}
      />
    </View>
  );
};

export default RepositoryList;
