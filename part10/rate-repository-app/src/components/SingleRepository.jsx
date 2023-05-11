import RepositoryInfo from "./RepositoryInfo";
import { useParams } from "react-router-native";
import { format, parseISO } from "date-fns";
import { FlatList, View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
import ItemSeparator from "./ItemSeparator";
import { useQuery } from "@apollo/client";
import { REPO_REVIEWS } from "../graphql/queries";
import { useState } from "react";
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
  const [repository, setRepository] = useState();
  const [reviews, setReviews] = useState();
  useQuery(REPO_REVIEWS, {
    variables: { id: repo_id },
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setRepository(data?.repository);
      setReviews(data?.repository.reviews.edges);
    },
  });

  if (repository === null || repository === undefined) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  } else {
    return (
      <FlatList
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ node: { id } }) => id}
        ItemSeparatorComponent={ItemSeparator}
      />
    );
  }
};

export default SingleRepository;
