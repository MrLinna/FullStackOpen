import { View, StyleSheet, Text} from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight*2,
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
    flexDirection: 'row',
    justifyContent:'space-evenly'
  },
  text:{
    fontSize: theme.fontSizes.appBar,
    color: theme.colors.appBarText,
    fontWeight : theme.fontWeights.bold,
    
  }
});

const AppBar = () => {
  return (
  <View style={styles.container}>
    <Link to="/">
      <Text style ={styles.text}>Repositories</Text>
    </Link>
    
    <Link to="/signin">
      <Text style ={styles.text}>Sign in</Text>
    </Link>
  </View>
  );
};



  


export default AppBar;