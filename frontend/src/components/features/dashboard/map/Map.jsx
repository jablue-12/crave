import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import React from 'react';

export default function Map ({ center }) {
	const containerStyle = {
		width: '95%',
		height: '350px',
		borderRadius: '5px'
	};

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.REACT_APP_MAP_API
	});

	return isLoaded && <GoogleMap
		mapContainerStyle={containerStyle}
		center={center}
		zoom={13}
	>
		<></>
	</GoogleMap>;
}
