import { View, Pressable, Linking } from "react-native";
import Text from "./Text";

import theme from "../SignInTheme";
import RepositoryItem from "./RepositoryItem";
import ItemSeparator from "./ItemSeparator";

const RepositoryInfo = ({ repository }) => {
  console.log("Repository infossa", repository);

  const handleSubmit = () => {
    Linking.openURL(repository.url);
  };
  return (
    <View>
      <View style={theme.flexContainer}>
        <RepositoryItem item={repository} />

        <Pressable onPress={() => handleSubmit()} style={theme.buttonContainer}>
          <Text style={theme.buttonText}>Open in GitHub</Text>
        </Pressable>
      </View>
      <ItemSeparator />
    </View>
  );
};
export default RepositoryInfo;
