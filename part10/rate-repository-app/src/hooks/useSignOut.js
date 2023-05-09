import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";

const useSingOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  };
  return [signOut];
};

export default useSingOut;
