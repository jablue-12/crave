import { replace, split } from 'lodash';

export const splitDate = date => {
	return replace(split(date, '.')[0], 'T', ' ');
};

export const logger = {
	info: content => {
		console.log('Logging info');
		console.log(content);
	}
};

export const getNearbyPlaces = (givenLat = 49.8083968, givenLng = 97.134417, positions = [
	{ lat: 49.8095558, lng: -97.1336855 },
	{ lat: 49.8075558, lng: -97.13568550000001 },
	{ lat: 49.8105558, lng: -97.1366855 }
]) => {
	function haversine (lat1, lon1, lat2, lon2) {
		const toRadians = value => (value * Math.PI) / 180;
		const R = 6371;

		const dLat = toRadians(lat2 - lat1);
		const dLon = toRadians(lon2 - lon1);

		const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		return R * c;
	}

	let closestPosition;
	let minDistance = Infinity;

	positions.forEach(position => {
		const distance = haversine(givenLat, givenLng, position.lat, position.lng);
		if (distance < minDistance) {
			minDistance = distance;
			closestPosition = position;
		}
	});

	return closestPosition;
};
