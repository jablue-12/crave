import React, { useEffect, useRef, useState } from 'react';
import Map from './Map';

const Locator = ({ setRestaurants, setRestaurant }) => {
	const [center, setCenter] = useState({
		lat: -5.745,
		lng: -38.523
	});

	const placesScriptRef = useRef(null);
	const mapRef = useRef(null);
	const searchBarRef = useRef(null);

	const configureGooglePlaces = () => {
		placesScriptRef.current = document.createElement('script');
		placesScriptRef.current.async = true;
		placesScriptRef.current.defer = true;
		placesScriptRef.current.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCPQr0gvQc2EKvJWjkSiaXsLW89WAbMGPs&libraries=places&callback=initMap'; // TODO - Environmental variable

		placesScriptRef.current.onload = () => {
			const map = new window.google.maps.Map(mapRef.current, {
				center, // TODO - User location
				zoom: 10
			});

			const autocomplete = new window.google.maps.places.Autocomplete(searchBarRef.current);
			autocomplete.bindTo('bounds', map);
			autocomplete.addListener('place_changed', () => {
				const { geometry } = autocomplete.getPlace();
				if (geometry) {
					setCenter({
						lat: geometry.location.lat(),
						lng: geometry.location.lng()
					});
					const request = {
						location: geometry.location,
						radius: '800', // TODO - Constant
						type: ['restaurant']
					};
					const service = new window.google.maps.places.PlacesService(map);
					service.nearbySearch(request, (results, status) => {
						if (status === window.google.maps.places.PlacesServiceStatus.OK) {
							const data = results.slice(0, Math.min(results.length, 8));
							console.log(data);
							setRestaurants(x => data || x); // TODO - Constant
						}
					});
				}
				setRestaurant(null);
			});
		};

		document.body.appendChild(placesScriptRef.current);
	};

	useEffect(() => {
		configureGooglePlaces();
		return () => {
			if (placesScriptRef.current) {
				document.body.removeChild(placesScriptRef.current);
			}
		};
	}, []);

	return <>
		<h4>Map</h4>
		<div className="form-group mb-2">
			<input
				className="form-control"
				id="locator"
				type="text"
				placeholder="Location"
				ref={searchBarRef}
				style={{
					fontSize: '14px',
					width: '95%',
					height: '30px',
					border: 'none',
					borderRadius: '50px',
					padding: '10px'
				}}
			/>
		</div>
		<div ref={mapRef}></div>
		<Map center={center} />
	</>;
};

export default Locator;
