import React, {useState, useEffect} from 'react';
import {View, Keyboard, Text, Dimensions, StyleSheet, Alert} from 'react-native';
import {Appbar, TextInput, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import GalleryModal from './GalleryModal';
import axios from 'axios';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const SlotDetails = ({navigation, route}) => {
	const [timeData, setTimeData] = useState('');
	const [data, setData] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [mobNum, setMobNum] = useState('');
	const [modalVisible, setModalVisible] = useState(false);
	const [imageData, setImageData] = useState([]);

	useEffect(() => {
		AsyncStorage.getItem('timeSlots').then(res => {
			setTimeData(JSON.parse(res));
		});

		setData(route.params.data);
		if (route.params.data.firstname !== undefined && route.params.data.firstname !== '') {
			setFirstName(route.params.data.firstname);
		}
		if (route.params.data.lastname !== undefined && route.params.data.lastname !== '') {
			setLastName(route.params.data.lastname);
		}
		if (route.params.data.mobnum !== undefined && route.params.data.mobnum !== '') {
			setMobNum(route.params.data.mobnum);
		}

		axios
			.get('https://api.unsplash.com/photos?client_id=xMRlQU1x23MxdcBDYe5W03-hPfwxENxVG-6kktW5qds')
			.then(res => {
				setImageData(res.data);
			})
			.catch(e => console.log('jahgjhdad', e));
	}, []);

	const handleSave = async () => {
		if (firstName.length > 2 && lastName.length > 2 && mobNum.length === 10) {
			const saveData = {
				id: data.id,
				sch: 'T',
				time: data.time,
				firstname: firstName,
				lastname: lastName,
				mobnum: mobNum
			};
			const prevData = timeData;
			const index = prevData.findIndex(obj => obj.id === data.id);
			prevData[index] = saveData;

			try {
				await AsyncStorage.setItem('timeSlots', JSON.stringify(prevData));
				navigation.navigate('TimeSlots');
			} catch (e) {
				console.log('jhagdjha', e);
			}
		} else {
			Alert.alert(
				'Form Validation Failed',
				'1. Firstname should be 3 or more characters \n2. Lastname should be 3 or more characters, \n3. Mobile Number should be 10 digits '
			);
		}
	};

	const handleGallery = () => {
		const options = {
			title: 'Select Image',
			storageOptions: {
				skipBackup: true,
				path: 'images'
			}
		};

		ImagePicker.showImagePicker(options, response => {
			console.log('Response = ', response);

			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
				const source = {uri: response.uri};

				// You can also display the image using data:
				// const source = { uri: 'data:image/jpeg;base64,' + response.data };
			}
		});
	};

	const handleInAppGallery = () => {
		setModalVisible(true);
	};

	const handleModalClose = () => {
		setModalVisible(false);
	};

	return (
		<View style={{flex: 1}}>
			<Appbar.Header>
				<Appbar.BackAction onPress={() => navigation.navigate('TimeSlots')} />
				<Appbar.Content title="Slot Details" />
			</Appbar.Header>
			<View style={styles.container}>
				<Text style={styles.titleText}>
					Enter Details for Time Slot: <Text style={{color: '#3498db'}}>{data.time} </Text>
				</Text>

				<TextInput
					style={styles.textInput}
					label="First Name"
					value={firstName}
					mode="outlined"
					onChangeText={text => setFirstName(text)}
				/>

				<TextInput
					style={styles.textInput}
					label="Last Name"
					value={lastName}
					mode="outlined"
					onChangeText={text => setLastName(text)}
				/>

				<TextInput
					style={styles.textInput}
					label="Mobile Number"
					value={mobNum}
					mode="outlined"
					onChangeText={text => {
						setMobNum(text);
						if (text.length === 10) {
							Keyboard.dismiss();
						}
					}}
				/>

				<View style={styles.btnView}>
					<Button
						style={styles.cancelBtn}
						icon="cancel"
						mode="contained"
						onPress={() => navigation.navigate('TimeSlots')}
					>
						Cancel
					</Button>

					<Button style={styles.saveBtn} icon="download" mode="contained" onPress={() => handleSave()}>
						Save
					</Button>
				</View>
				<Button style={styles.galleryBtn} mode="contained" onPress={() => handleGallery()}>
					Image Picker
				</Button>

				<Button style={styles.galleryBtn} mode="contained" onPress={() => handleInAppGallery()}>
					Open In-App Image Gallery
				</Button>
			</View>

			<GalleryModal visible={modalVisible} data={imageData} onClose={handleModalClose} />
		</View>
	);
};

export default SlotDetails;

const styles = StyleSheet.create({
	container: {
		margin: 20
	},
	textInput: {
		marginTop: 10
	},
	btnView: {
		marginTop: 20,
		textAlign: 'right',
		flexDirection: 'row'
	},
	titleText: {
		fontSize: Platform.OS === 'android' ? 20 : 18,
		fontWeight: 'bold'
	},
	cancelBtn: {
		backgroundColor: '#F77C7D',
		width: SCREEN_WIDTH * 0.44
	},
	saveBtn: {
		marginLeft: 10,
		width: SCREEN_WIDTH * 0.44
	},
	btnText: {
		color: 'black'
	},
	galleryBtn: {
		marginTop: 20
	}
});
