import { format, parseISO } from "date-fns";
import { View, StyleSheet, Pressable, Dimensions, Alert } from "react-native";
import Text from "./Text";
import theme from "../theme";
import SignInTheme from "../SignInTheme";
import useDeleteReview from "../hooks/useDeleteReview";
import { useNavigate } from "react-router-native";

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
  viewBtn: {
    backgroundColor: theme.colors.signInBtn,
    borderRadius: 3,
    width: (0.9 * Dimensions.get("window").width) / 2,
    paddingVertical: 20,
    marginRight: 7,
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deleteBtn: {
    backgroundColor: theme.colors.error,
    borderRadius: 3,
    width: (0.9 * Dimensions.get("window").width) / 2,
    paddingVertical: 20,
    marginLeft: 7,
    shadowColor: theme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: SignInTheme.buttonText,
});

const ReviewItem = ({ review, userReview, refe }) => {
  const header = userReview
    ? `${review.node.repository.ownerName}/${review.node.repository.name}`
    : review.node.user.username;
  const navigate = useNavigate();

  const handleView = (review) => {
    const regex = /^[^.]+\.(.+)$/;
    const str = review.node.id;
    const ID = str.match(regex)[1];
    const path = `/repositoryinfo/${ID}`;
    navigate(path);
  };

  const [deleteReview] = useDeleteReview();
  const handleDelete = (review) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete review?",
      [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Delete",
          onPress: () => {
            deleteReview(review.node.id);
            refe({ includeReviews: true });
          },
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      }
    );
  };

  return (
    <View>
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
      {!userReview ? (
        <></>
      ) : (
        <View style={styles.Container}>
          <Pressable onPress={() => handleView(review)} style={styles.viewBtn}>
            <Text style={styles.buttonText}>View repository</Text>
          </Pressable>
          <Pressable
            onPress={() => handleDelete(review)}
            style={styles.deleteBtn}
          >
            <Text style={styles.buttonText}>Delete review</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};
export default ReviewItem;
