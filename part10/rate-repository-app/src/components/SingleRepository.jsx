import { View, Pressable, Linking } from "react-native";
import Text from "./Text";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import theme from "../SignInTheme";
import RepositoryItem from "./RepositoryItem";

const SingleRepository = () => {
  const repo_id = useParams().id;

  const { loading, data } = useQuery(GET_REPOSITORY, {
    variables: { id: repo_id },
  });
  if (loading) return null;
  const handleSubmit = () => {
    Linking.openURL(data.repository.url);
  };

  return (
    <View style={theme.flexContainer}>
      <RepositoryItem item={data.repository} />
      <Pressable onPress={() => handleSubmit()} style={theme.buttonContainer}>
        <Text style={theme.buttonText}>Open in GitHub</Text>
      </Pressable>
    </View>
  );
};
export default SingleRepository;
