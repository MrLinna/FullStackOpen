import {View, Image, StyleSheet} from "react-native";
import theme from '../theme';
import Text from './Text'

const styles = StyleSheet.create({
	
	logo: {
		width: 80,
		height: 80,
		borderRadius:5
	},
	avatarImage: {
		flexGrow: 0,
		padding: 10,
	},
	
	flexContainer: {
		display: 'flex',
		paddingBottom: 10,
		backgroundColor: theme.colors.appBarText,
		flexDirection: 'row',
	},
	statText: {
		fontSize: theme.fontSizes.subheading,
		fontWeight: theme.fontWeights.bold,
		paddingTop:10,
		textAlign: 'center'
	},
	secondary:{
		paddingBottom:10,
		fontSize:theme.fontSizes.body,
		textAlign: 'center'
	},
	biosecondary:{
		paddingBottom:10,
		fontSize:theme.fontSizes.body,
	},
	language:{
		backgroundColor:theme.colors.primary,
		borderRadius:2,
		color: theme.colors.appBarText,
		padding:3,
		fontSize: theme.fontSizes.language,
	},
	biotext: {
		paddingTop: 3,
		flexGrow: 0,
		borderColor: 'black',
		alignItems: 'flex-start',
		flexShrink: 1,
	},
	stats: {
		paddingLeft: 25,
		width: '25%',
		justifyContent: 'center',
	},
  });


const RepositoryItem = ({item}) => {
	return (
		<View>
			<View style={styles.flexContainer}>
				<View style={styles.avatarImage}>
				<Image
					style={styles.logo}
					source={{uri: item.ownerAvatarUrl}}
				/>
				</View>
				<View style={styles.biotext}>
					<Text fontSize={'subheading'} fontWeight={'bold'} style={styles.fullNametex}>{item.fullName}</Text>
					<Text color = 'textSecondary' style={styles.biosecondary}>{item.description}</Text>
					<Text style={styles.language}>
						{item.language}
					</Text>
				</View>
			</View>
  
			<View style={styles.flexContainer} >
				<View style = {styles.stats}>
					<Text style={styles.statText}><Suffix value ={item.stargazersCount}/></Text>
					<Text  color = 'textSecondary' style ={styles.secondary}>Stars</Text>
				</View>
				
				<View style = {styles.stats}>
					<Text style={styles.statText}><Suffix value ={item.forksCount}/></Text>
					<Text  color = 'textSecondary' style = {styles.secondary}>Forks</Text>
				</View>
				
				<View style = {styles.stats}>
					<Text style={styles.statText}><Suffix value ={item.reviewCount}/></Text>
					<Text color = 'textSecondary'  style ={styles.secondary}>
						Reviews</Text>
				</View>

				<View style = {styles.stats}>
					<Text style={styles.statText}><Suffix value ={item.ratingAverage}/></Text>
					<Text  color = 'textSecondary' style ={styles.secondary}>Rating</Text>
				</View>
			</View>
		</View>
	)
}

const Suffix =  ({value}) => value > 1000 ? String((value / 1000).toFixed(1)).replace(/\.0+$/, '')+'k' : value

export default RepositoryItem


