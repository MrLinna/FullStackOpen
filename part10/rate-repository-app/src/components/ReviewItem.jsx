import { format, parseISO } from "date-fns";
import { View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

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

const ReviewItem = ({ review, userReview }) => {
  const header = userReview
    ? `${review.node.repository.ownerName}/${review.node.repository.name}`
    : review.node.user.username;
  return (
    <View style={styles.Container}>
      <View style={styles.Circle}>
        <Text color="primary" fontWeight={"bold"} fontSize={"subheading"}>
          {review.node.rating}
        </Text>
      </View>
      <View style={styles.desc}>
        <Text style={styles.username} color="textPrimary" fontWeight={"bold"}>
          {userReview ? header : review.node.user.username}
        </Text>
        <Text color="textSecondary">
          {format(parseISO(review.node.createdAt), "dd.MM.yyyy")}
        </Text>
        <Text color="textPrimary">{review.node.text} </Text>
      </View>
    </View>
  );
};
export default ReviewItem;
