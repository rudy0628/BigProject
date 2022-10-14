import React, { useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import AircraftMap from '../../components/airtshop/map/AircraftMap';
import AircraftModal from '../../components/airtshop/map/AircraftModal';
import FullPageLoading from '../../components/utils/FullPageLoading';

import useUiStore from '../../store/uiStore';

const LiveAircraft = ({ flightData }: any) => {
	const [aircraftDetail, setAircraftDetail] = useState({
		aircraftId: '',
		from: '',
		to: '',
		speed: 0,
	});
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<Head>
				<title>Airtshop - 實時航班</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<AircraftMap
				setAircraftDetail={setAircraftDetail}
				handleOpen={handleOpen}
				flightData={flightData}
			/>
			<AircraftModal
				open={open}
				handleClose={handleClose}
				aircraftDetail={aircraftDetail}
			/>
		</>
	);
};

export const getServerSideProps = async () => {
	const response = await axios.get(
		`https://airlabs.co/api/v9/flights?api_key=${process.env.NEXT_PUBLIC_AIRLABS_API_KEY}`
	);

	const data = response.data.response;
	return {
		props: {
			flightData: data,
		},
	};
};

export default LiveAircraft;
