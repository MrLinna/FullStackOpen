import { StyleSheet, View } from "react-native";
import RepositoryList from "./RepositoryList";
import AppBar from "./AppBar";
import { Route, Routes, Navigate } from "react-router-native";
import theme from "../theme";
import SignOut from "./SignOut";
import SignIn from "./SignIn";
import SingleRepository from "./SingleRepository";
import ReviewForm from "./ReviewForm";
import CreateUser from "./CreateUser";
import UserReviews from "./UserReview";
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="/signout" element={<SignOut />} exact />
        <Route
          path="/repositoryinfo/:id"
          element={<SingleRepository />}
          exact
        />
        <Route path="/review" element={<ReviewForm />} exact />
        <Route path="/signup" element={<CreateUser />} exact />
        <Route path="/userreviews" element={<UserReviews />} exact />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
