import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import React from 'react';

export default function Map () {
	const containerStyle = {
		width: '100%',
		height: '300px'
	};

	const center = {
		lat: -3.745,
		lng: -38.523
	};

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: ''
	});

	return isLoaded && <GoogleMap
		mapContainerStyle={containerStyle}
		center={center}
		zoom={13}
	>
		<></>
	</GoogleMap>;
}
