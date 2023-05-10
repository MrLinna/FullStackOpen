import { View, Pressable, Linking } from "react-native";
import Text from "./Text";

import theme from "../SignInTheme";
import RepositoryItem from "./RepositoryItem";
import ItemSeparator from "./ItemSeparator";

const RepositoryInfo = ({ loading, data }) => {
  if (loading) return null;
  const handleSubmit = () => {
    Linking.openURL(data.repository.url);
  };
  return (
    <View>
      <View style={theme.flexContainer}>
        <RepositoryItem item={data.repository} />

        <Pressable onPress={() => handleSubmit()} style={theme.buttonContainer}>
          <Text style={theme.buttonText}>Open in GitHub</Text>
        </Pressable>
      </View>
      <ItemSeparator />
    </View>
  );
};
export default RepositoryInfo;
