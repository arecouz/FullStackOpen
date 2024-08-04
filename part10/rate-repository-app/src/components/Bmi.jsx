import RepositoryItem from './RepositoryItem';
import { FlatList } from 'react-native';
import Text from './Text';

import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphQl/queries';

const RepositoryList = () => {
  const { repositories, error, loading } = useQuery(GET_REPOSITORIES);

  if (error) return <Text>{error.message}</Text>;
  if (loading) return <Text>loading</Text>;

  console.log(repositories);

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  );
};

export default RepositoryList;
