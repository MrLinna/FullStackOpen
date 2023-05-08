import { SIGN_IN } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    // call the mutate function here with the right arguments
    mutate({ variables: { username, password } });
  };

  return [signIn, result];
};
export default useSignIn;
