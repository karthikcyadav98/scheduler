import React, {useState, useEffect} from 'react';
import {SafeAreaView, View} from 'react-native';
import Navigation from './src/Navigation/Navigation';
import AsyncStorage from '@react-native-community/async-storage';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

const App = () => {
	const [data, setData] = useState('');

	const timeSlots = [
		{id: '1', time: '09:00 AM', sch: 'F'},
		{id: '2', time: '10:00 AM', sch: 'F'},
		{id: '3', time: '11:00 AM', sch: 'F'},
		{id: '4', time: '12:00 PM', sch: 'F'},
		{id: '5', time: '01:00 PM', sch: 'F'},
		{id: '6', time: '02:00 PM', sch: 'F'},
		{id: '7', time: '03:00 PM', sch: 'F'},
		{id: '8', time: '04:00 PM', sch: 'F'},
		{id: '9', time: '05:00 PM', sch: 'F'}
	];

	// AsyncStorage.clear();
	AsyncStorage.getItem('timeSlots').then(async res => {
		if (res === null) {
			try {
				await AsyncStorage.setItem('timeSlots', JSON.stringify(timeSlots));
				setData(true);
			} catch (e) {
				console.log('jagjhad', e);
			}
		}
	});

	const theme = {
		...DefaultTheme,
		roundness: 2,
		colors: {
			...DefaultTheme.colors,
			primary: '#3498db',
			accent: '#2e7d32'
		}
	};

	return (
		<PaperProvider style={{flex: 1}} theme={theme}>
			<View style={{flex: 1}}>
				<Navigation />
			</View>
		</PaperProvider>
	);
};

export default App;
