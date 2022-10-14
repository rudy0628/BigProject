import CategoryIcon from '@mui/icons-material/Category';
import AddIcon from '@mui/icons-material/Add';

export const shoppingsiteNavData = [
	{
		text: '所有商品',
		url: '/shoppingsite',
		icon: CategoryIcon,
		auth: false,
	},
	{
		text: '新增商品',
		url: '/shoppingsite/addItem',
		icon: AddIcon,
		auth: true,
	},
];

export const categories = [
	{
		type: '時尚',
		list: ['衣服', '鞋子', '手提包', '手錶', '其他配件'],
	},
	{
		type: '手機與平板',
		list: ['三星', '蘋果', 'OPPO', '小米', 'Vivo'],
	},
	{
		type: '家電電器',
		list: ['冰箱', '洗衣機', '電視', '微波爐', '洗碗機'],
	},
	{
		type: '書籍',
		list: ['料理', '小說', '知識', '程式語言', '童話'],
	},
	{
		type: '電影票',
		list: ['近期上映', '日本', '韓國', '歐洲', '美國'],
	},
	{
		type: '日用',
		list: ['衛生紙', '洗衣精', '洗髮精', '沐浴乳', '醫療用品/口罩'],
	},
	{
		type: '運動戶外',
		list: ['露營', '登山', '水上', '健身', '單車'],
	},
	{
		type: '食品',
		list: ['蔬果甜點', '冷凍', '熟食', '飲料', '零食'],
	},
	{
		type: '生活',
		list: ['桌子', '沙發/椅', '床/櫃子', '收納', '層架'],
	},
	{
		type: '3C',
		list: ['筆記電腦', '桌上電腦', '商用電腦', 'CPU', '顯示卡'],
	},
];
