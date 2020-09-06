import React, {useState, useEffect} from 'react';
import {Modal, View, Text, FlatList, Dimensions, Image} from 'react-native';
import {Appbar} from 'react-native-paper';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const GalleryModal = ({visible, data, onClose}) => {
	console.log('ajjdhad', data);
	return (
		<Modal animationType="slide" visible={visible} onRequestClose={() => onClose()}>
			<View>
				<Appbar.Header>
					<Appbar.BackAction onPress={() => onClose()} />
					<Appbar.Content title="In App Image Gallery" />
				</Appbar.Header>
				<FlatList
					style={{marginTop: 15, marginBottom: 120}}
					data={data}
					keyExtractor={item => item.id}
					numColumns={2}
					renderItem={({item}) => (
						<View
							style={{
								flex: 1,
								flexDirection: 'row',
								width: SCREEN_WIDTH
							}}
						>
							<View>
								{console.log('ahgdjhad', item.urls.raw)}
								<Image
									style={{width: 200, height: 200, marginBottom: 10}}
									source={{
										uri: item.urls.raw
									}}
								/>
							</View>
						</View>
					)}
				/>
			</View>
		</Modal>
	);
};

export default GalleryModal;
