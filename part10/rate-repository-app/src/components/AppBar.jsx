import { View, StyleSheet, Text, ScrollView } from "react-native";
import Constants from "expo-constants";
import theme from "../theme";
import { Link } from "react-router-native";
import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight * 2,
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  text: {
    fontSize: theme.fontSizes.appBar,
    color: theme.colors.appBarText,
    fontWeight: theme.fontWeights.bold,
  },
  scrollItem: {
    paddingRight: 20,
    paddingLeft: 15,
  },
});

const AppBar = () => {
  const { data } = useQuery(ME, { fetchPolicy: "cache-and-network" });
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scroll}>
        <Link to="/" style={styles.scrollItem}>
          <Text style={styles.text}>Repositories</Text>
        </Link>

        {data?.me ? (
          <>
            <Link to="/review" style={styles.scrollItem}>
              <Text style={styles.text}>Create a review</Text>
            </Link>
            <Link to="/signout" style={styles.scrollItem}>
              <Text style={styles.text}>{"Sign out"}</Text>
            </Link>
          </>
        ) : (
          <>
            <Link to="/signin" style={styles.scrollItem}>
              <Text style={styles.text}>{"Sign in"}</Text>
            </Link>
            <Link to="/signup" style={styles.scrollItem}>
              <Text style={styles.text}>{"Sign up"}</Text>
            </Link>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;

/*
import { View, StyleSheet, Text, ScrollView, Alert, Pressable} from 'react-native';
import {useState} from "react";
import { useNavigate } from 'react-router-native';
  const navigate = useNavigate()
  const [sure, setSure] = useState(false);
  const showConfirmDialog = () => {
    Alert.alert(
      "Are you sure to sign out?",
      "",
      [
        {text: "Sign out", onPress: () => setSure(true)},
        {text: "Cancel"}
      ]
    )
    if(sure){
      setSure(false)
      navigate('/signout')
    }
  }
*/
