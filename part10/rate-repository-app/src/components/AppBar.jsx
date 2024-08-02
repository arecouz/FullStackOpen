import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    borderBottomWidth: 32,
    backgroundColor: 'black',
  },
  link: {
    marginHorizontal: 10, // Adjust this value to increase or decrease space between links
  },
  text: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    color: 'white',
    textDecorationLine: 'underline',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable style={styles.link}>
          <Link to="/signIn">
            <Text style={styles.text}>Sign In</Text>
          </Link>
        </Pressable>
        <Pressable style={styles.link}>
          <Link to="/">
            <Text style={styles.text}>Home</Text>
          </Link>
        </Pressable>
        <Pressable style={styles.link}>
          <Link to="/bmi">
            <Text style={styles.text}>bmi</Text>
          </Link>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default AppBar;
