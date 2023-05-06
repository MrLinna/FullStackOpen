import { View, StyleSheet, Text, Pressable} from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight*2,
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar
  },
  text:{
    fontSize: theme.fontSizes.appBar,
    color: theme.colors.appBarText,
    fontWeight : theme.fontWeights.bold
  }
});

const AppBar = () => {
  return (
  <View style={styles.container}>
    <Pressable onPress={() => console.log('pressed')}>
      <Text style ={styles.text}>Repositories</Text>
    </Pressable>
  </View>);
};



  


export default AppBar;