import RepositoryInfo from "./RepositoryInfo";
import { useParams } from "react-router-native";
import { FlatList, View } from "react-native";
import Text from "./Text";
import ItemSeparator from "./ItemSeparator";
import { useQuery } from "@apollo/client";
import { REPO_REVIEWS } from "../graphql/queries";
import { useState } from "react";
import ReviewItem from "./ReviewItem";

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
