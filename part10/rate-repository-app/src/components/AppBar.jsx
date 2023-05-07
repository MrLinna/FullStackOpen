import { View, StyleSheet, Text, ScrollView} from 'react-native';
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
    
  },
  scrollItem:{
    paddingRight:20,
    paddingLeft:15
  }
});

const AppBar = () => {
  return (


<View style={styles.container}>
  <ScrollView horizontal style={styles.scroll}>
    
    <Link to="/" style = {styles.scrollItem}>
      <Text style ={styles.text}>Repositories</Text>
    </Link>
    
    <Link to="/signin" style = {styles.scrollItem}>
      <Text style ={styles.text}>Sign in</Text>
    </Link>

  </ScrollView>
</View>

  );
};



  


export default AppBar;