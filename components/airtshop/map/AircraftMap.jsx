import React, { useState, useEffect } from 'react';
import {
	GoogleMap,
	useJsApiLoader,
	Marker,
	MarkerClusterer,
} from '@react-google-maps/api';
import useGeoLocation from '../../../hooks/useGeoLocation';

const AircraftMap = ({ setAircraftDetail, handleOpen, flightData }) => {
	// get user current location
	const location = useGeoLocation();
	const lat = Number(JSON.stringify(location.coordinates.lat));
	const lng = Number(JSON.stringify(location.coordinates.lng));

	const [coords, setCoords] = useState({ lat: 0, lng: 0 });

	// if map is loaded
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
	});

	useEffect(() => {
		if (lat && lng) {
			setCoords({ lat, lng });
		}
	}, [lat, lng]);

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={{
				width: '100%',
				height: '100vh',
			}}
			center={coords}
			zoom={10}
			options={{ streetViewControl: false }}
		>
			<MarkerClusterer
				options={{
					imagePath:
						'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
					styles: [],
				}}
			>
				{/* {listings} */}
				{clusterer =>
					flightData.map(({ lat, lng, ...flight }, i) => (
						<Marker
							key={i}
							position={{ lat, lng }}
							clusterer={clusterer}
							icon={{
								path: 'M22 16v-2l-8.5-5V3.5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5V9L2 14v2l8.5-2.5V19L8 20.5V22l4-1 4 1v-1.5L13.5 19v-5.5L22 16z',
								fillColor: `#${flight.hex}`,
								fillOpacity: 1,
								scale: 1.5,
								rotation: flight.dir,
							}}
							onClick={() => {
								setCoords({ lat, lng });
								setAircraftDetail({
									aircraftId: flight.aircraft_icao,
									from: flight.dep_iata,
									to: flight.arr_iata,
									speed: flight.speed,
								});
								handleOpen();
							}}
						/>
					))
				}
			</MarkerClusterer>
		</GoogleMap>
	) : (
		<></>
	);
};

export default React.memo(AircraftMap);
