import RepositoryInfo from "./RepositoryInfo";
import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { REPO_REVIEWS } from "../graphql/queries";
import { format, parseISO } from "date-fns";
import { FlatList, View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
import ItemSeparator from "./ItemSeparator";

const styles = StyleSheet.create({
  Container: {
    display: "flex",
    flexDirection: "row",
    padding: 15,
    backgroundColor: theme.colors.appBarText,
  },
  Circle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderStyle: "solid",
    borderColor: theme.colors.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  desc: {
    flexShrink: 1,
  },
  username: {
    lineHeight: 26,
  },
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.Container}>
      <View style={styles.Circle}>
        <Text color="primary" fontWeight={"bold"} fontSize={"subheading"}>
          {review.node.rating}
        </Text>
      </View>
      <View style={styles.desc}>
        <Text style={styles.username} color="textPrimary" fontWeight={"bold"}>
          {review.node.user.username}
        </Text>
        <Text color="textSecondary">
          {format(parseISO(review.node.createdAt), "dd.MM.yyyy")}
        </Text>
        <Text color="textPrimary">{review.node.text} </Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const repo_id = useParams().id;

  const { loading, data } = useQuery(REPO_REVIEWS, {
    variables: { id: repo_id },
  });

  const reviews = data?.repository.reviews.edges;
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryInfo loading={loading} data={data} />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepository;
