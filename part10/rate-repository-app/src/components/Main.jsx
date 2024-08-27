import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignInForm from './SignIn';
import SignUpForm from './SignUpForm';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signIn" element={<SignInForm />} />
        <Route path="/signUp" element={<SignUpForm />} />
        <Route path="/:id" element={<SingleRepository />} />
        <Route path="/createReview" element={<CreateReview />} />
        <Route path="/myReviews" element={<MyReviews />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
