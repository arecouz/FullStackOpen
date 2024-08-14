import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import SignInContainer from './SignInContainer';

const SignInForm = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (credentials) => {
    try {
      const response = await signIn(credentials);
      console.log('signIn response: ', response.data);
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignInForm;
