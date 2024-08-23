import { Searchbar } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  searchBar: {
    backgroundColor: 'black',  // Black background
  },
  inputStyle: {
    color: 'white', // White text
  },
});

const RepositorySearchBar = ({searchQuery, setSearchQuery}) => {

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        placeholderTextColor="gray"  // sOptional: Gray placeholder text
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}     // Black background
        inputStyle={styles.inputStyle} // White text
        iconColor="white"            // White search icon
      />
    </View>
  );
};

export default RepositorySearchBar;
