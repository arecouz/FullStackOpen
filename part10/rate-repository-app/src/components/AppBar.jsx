import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Text from './Text';
import theme from '../theme';
import { Link, useNavigate } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { ME } from '../graphQl/queries';
import useSignOut from '../hooks/useSignOut';

const styles = StyleSheet.create({
  container: {
    paddingTop: 45,
    borderBottomWidth: 13,
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
  userText: {
    fontSize: theme.fontSizes.body,
    color: 'yellow',
  },
  userContainer: {
    justifyContent: 'center',
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const signOut = useSignOut();
  const navigate = useNavigate();

  const user = data ? data.me : null;

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/signIn');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        {!user && (
          <Pressable style={styles.link}>
            <Link to="/signIn">
              <Text style={styles.text}>Sign In</Text>
            </Link>
          </Pressable>
        )}
        {!user && (
          <Pressable style={styles.link}>
            <Link to="/signUp">
              <Text style={styles.text}>Sign Up</Text>
            </Link>
          </Pressable>
        )}
        {user && (
          <Pressable style={styles.link} onPress={handleSignOut}>
            <View style={styles.userContainer}>
              <Text style={styles.text}>Sign Out</Text>
              <Text style={styles.userText}>{user.username}</Text>
            </View>
          </Pressable>
        )}
        <Pressable style={styles.link}>
          <Link to="/">
            <Text style={styles.text}>Home</Text>
          </Link>
        </Pressable>
        {user && (
          <Pressable style={styles.link}>
            <Link to="/MyReviews">
              <Text style={styles.text}>My Reviews</Text>
            </Link>
          </Pressable>
        )}
        {user && (
          <Pressable style={styles.link}>
            <Link to="/createReview">
              <Text style={styles.text}>Create Review</Text>
            </Link>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
