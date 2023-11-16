import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import React from 'react';

export default function Map ({ from = { lat: 30.3165, lng: 78.0322 }, to = { lat: 30.2553, lng: 78.0972 } }) {
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
		center={from}
		zoom={11}
	>
		<Marker
			position={from}
		/>
		<Marker
			position={to}
		/>
	</GoogleMap>;
}
