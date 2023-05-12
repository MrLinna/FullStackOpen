import { FlatList, View } from "react-native";
import { ME } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import ReviewItem from "./ReviewItem";
import ItemSeparator from "./ItemSeparator";
import Text from "./Text";

const UserReviews = () => {
  const variables = { includeReviews: true };
  const { data } = useQuery(ME, {
    variables: variables,
    fetchPolicy: "cache-and-network",
  });

  try {
    const reviews = data.me.reviews.edges;
    return (
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <ReviewItem review={item} userReview={true} />
        )}
        keyExtractor={({ node: { id } }) => id}
        ItemSeparatorComponent={ItemSeparator}
      />
    );
  } catch (error) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
};

export default UserReviews;
