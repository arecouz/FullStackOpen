import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 4,
    // ...
  },
  text: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
  },
  // ...
});

const AppBar = () => {
  console.log(theme.fontSizes.heading);
  return (
    <View style={styles.container}>
      <Pressable>
        <Text style={styles.text}>Repositories</Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
