import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Dimensions, Modal} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Appbar, Card} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const TimeSlots = ({navigation}) => {
	const [timeData, setTimeData] = useState([]);

	useEffect(
		() => {
			AsyncStorage.getItem('timeSlots').then(res => {
				setTimeData(JSON.parse(res));
			});
		},
		[timeData]
	);

	return (
		<View style={{flex: 1}}>
			<Appbar.Header>
				<Appbar.Content title="Time Slots" />
			</Appbar.Header>

			<View style={styles.container}>
				<FlatList
					style={styles.flatlist}
					keyExtractor={item => item.id}
					// keyExtractor={item => item.time}
					// numColumns={2}
					data={timeData}
					renderItem={({item}) => (
						<TouchableOpacity
							onPress={() => {
								navigation.navigate('SlotDetails', {data: item});
							}}
						>
							<Card style={[styles.card, {borderColor: item.sch === 'F' ? '#01A2FF' : 'red'}]}>
								<Text style={[styles.timeText, {color: item.sch === 'F' ? '#01A2FF' : 'red'}]}>
									{item.time}
								</Text>
							</Card>
						</TouchableOpacity>
					)}
				/>
			</View>
		</View>
	);
};

export default TimeSlots;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		marginBottom: 20
	},
	flatlist: {
		padding: 20
	},
	card: {
		margin: 20,
		// backgroundColor: '#40474c'
		borderWidth: 1
	},
	timeText: {
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: SCREEN_WIDTH * 0.3,
		marginTop: SCREEN_HEIGHT * 0.03,
		marginBottom: SCREEN_HEIGHT * 0.03,
		fontSize: 25,
		fontWeight: 'bold'
	}
});
