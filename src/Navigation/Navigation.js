import 'react-native-gesture-handler';
import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import TimeSlots from '../screens/TimeSlots';
import SlotDetails from '../screens/SlotDetails';

const Stack = createStackNavigator();

const Navigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="TimeSlots"
					options={{
						title: 'TimeSlots',
						headerShown: false
					}}
				>
					{props => <TimeSlots {...props} />}
				</Stack.Screen>

				<Stack.Screen
					name="SlotDetails"
					options={{
						title: 'SlotDetails',
						headerShown: false
					}}
				>
					{props => <SlotDetails {...props} />}
				</Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Navigation;
