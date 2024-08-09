import useAuthStorage from './useAuthStorage';
import { useApolloClient } from '@apollo/client';

const useSignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    const before = await authStorage.getAccessToken();
    console.log({ before });
    await authStorage.removeAccessToken();
    const after = await authStorage.getAccessToken();
    console.log({ after });
    apolloClient.resetStore();
  };

  return signOut;
};

export default useSignOut;
