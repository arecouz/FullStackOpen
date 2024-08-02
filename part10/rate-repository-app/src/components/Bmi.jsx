import { useState, useEffect } from "react";
import RepositoryItem from "./RepositoryItem";
import { FlatList } from 'react-native';


const RepositoryList = () => {
  const [repositories, setRepositories] = useState();

  const fetchRepositories = async () => {
    // Replace the IP address part with your own IP address!
    const response = await fetch("http://192.168.1.197:5000/api/repositories");
    const json = await response.json();

    console.log(json);

    setRepositories(json);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  // Get the nodes from the edges array
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
