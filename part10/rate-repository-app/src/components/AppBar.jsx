import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { Link, useNavigate } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { ME } from '../graphQl/queries';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    borderBottomWidth: 32,
    backgroundColor: 'black',
  },
  link: {
    marginHorizontal: 10, // Space between links
  },
  text: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    color: 'white',
    textDecorationLine: 'underline',
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const signOut = useSignOut();
  const navigate = useNavigate();

  const user = data ? data.me : null;

  const handleSignOut = async () => {
    await signOut();
    navigate('/signIn');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {!user ? (
          <Pressable style={styles.link}>
            <Link to="/signIn">
              <Text style={styles.text}>Sign In</Text>
            </Link>
          </Pressable>
        ) : (
          <Pressable style={styles.link} onPress={handleSignOut}>
            <Text style={styles.text}>Sign Out</Text>
          </Pressable>
        )}
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
