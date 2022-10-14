import StoreIcon from '@mui/icons-material/Store';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import UpgradeOutlinedIcon from '@mui/icons-material/UpgradeOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

export const imageData = [
	{
		img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
		title: 'Bed',
	},
	{
		img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
		title: 'Books',
	},
	{
		img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
		title: 'Sink',
	},
	{
		img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
		title: 'Kitchen',
	},
	{
		img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
		title: 'Blinds',
	},
	{
		img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
		title: 'Chairs',
	},
	{
		img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
		title: 'Laptop',
	},
	{
		img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
		title: 'Doors',
	},
	{
		img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
		title: 'Coffee',
	},
];

export const mainNavData = [
	{
		text: '線上購物',
		url: '/shoppingsite',
		icon: StoreIcon,
		auth: false,
	},
	{
		text: '機票訂購',
		url: '/airtshop',
		icon: AirplaneTicketIcon,
		auth: false,
	},
	{
		text: '動態',
		url: '/movement',
		icon: PeopleIcon,
		auth: false,
	},
	{
		text: '隱私權政策',
		url: '/privacy',
		icon: SecurityIcon,
		auth: false,
	},
];

export const cardData = [
	{
		title: '多樣性',
		text: '提供多樣商品選擇，讓我們成為您生活的一部分。',
		icon: FilterNoneOutlinedIcon,
	},
	{
		title: '快速方便',
		text: '快速查詢與下訂機票，讓購買機票不再是困難。',
		icon: BoltOutlinedIcon,
	},
	{
		title: '社群媒體',
		text: '透過交流讓資訊更透明化，讓您更安心使用我們的產品。',
		icon: GroupOutlinedIcon,
	},
	{
		title: '好評不斷',
		text: '過去五年內，好評度高達99%，讓您可以安心購買我們的產品。',
		icon: ThumbUpOffAltOutlinedIcon,
	},
	{
		title: '不斷更新',
		text: '我們會不斷更新及持續優化產品與內容，讓您有更好的使用體驗。',
		icon: UpgradeOutlinedIcon,
	},
	{
		title: '免費使用',
		text: '從創立以來，我們一直是提供使用者免費使用。',
		icon: FavoriteBorderOutlinedIcon,
	},
];
