import SearchIcon from '@mui/icons-material/Search';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';

export const airtshopNavData = [
	{
		text: '查詢航班',
		url: '/airtshop',
		icon: SearchIcon,
		auth: false,
	},
	{
		text: '機票',
		url: '/airtshop/ticketCart',
		icon: AirplaneTicketIcon,
		auth: true,
	},
	{
		text: '實時航班',
		url: '/airtshop/liveAircraft',
		icon: ConnectingAirportsIcon,
		auth: false,
	},
];

export const stepLabel = ['查詢機票', '選擇機票', '填寫付款資訊'];

export const getPriceFromClassType = (
	classType: string | string[] | undefined,
	duration: number
) => {
	let price: number = 0;
	if (classType === '經濟艙') {
		price = +duration * 52;
	} else if (classType === '商務艙') {
		price = +duration * 2 * 52;
	} else if (classType === '頭等艙') {
		price = +duration * 5 * 52;
	}

	return price;
};

export const generateSeat = () => {
	const seatRow = Array.from({ length: 36 }, (_, i) => i + 1);
	const seatCol = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
	const rowRandom = Math.floor(Math.random() * 36);
	const colRandom = Math.floor(Math.random() * 7);
	return `${seatRow[rowRandom]}${seatCol[colRandom]}`;
};

export const generateGate = () => {
	const gate = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
	const randomIndex = Math.floor(Math.random() * 7);
	return gate[randomIndex];
};
