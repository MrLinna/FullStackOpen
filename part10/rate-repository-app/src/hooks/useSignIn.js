import { SIGN_IN } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    try {
      const { data } = await mutate({ variables: { username, password } });
      await authStorage.setAccessToken(data.authenticate.accessToken);
      apolloClient.resetStore();
      return { data: data.authenticate.accessToken };
    } catch (error) {
      throw new Error(error.graphQLErrors[0].message);
    }

    // call the mutate function here with the right arguments
  };
  return [signIn, result];
};
export default useSignIn;
