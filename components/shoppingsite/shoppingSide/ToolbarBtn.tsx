import React from 'react';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import DehazeIcon from '@mui/icons-material/Dehaze';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';

interface IProps {
	setCartIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setCategoryIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setSearchIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToolbarBtn = ({
	setCartIsOpen,
	setCategoryIsOpen,
	setSearchIsOpen,
}: IProps) => {
	const router = useRouter();

	const actions = [
		{
			icon: <DehazeIcon />,
			name: '商品分類',
			clickHandler: () => setCategoryIsOpen(prevState => !prevState),
			show: true,
		},
		{
			icon: <ShoppingCartIcon />,
			name: '購物車',
			clickHandler: () => setCartIsOpen(prevState => !prevState),
			show: true,
		},
		{
			icon: <SearchIcon />,
			name: '搜尋',
			clickHandler: () => setSearchIsOpen(prevState => !prevState),
			show: router.pathname.startsWith('/shoppingsite'),
		},
	];

	return (
		<SpeedDial
			ariaLabel="SpeedDial basic example"
			sx={{ position: 'fixed', bottom: 16, right: 16 }}
			icon={<SpeedDialIcon />}
		>
			{actions
				.filter(action => action.show !== false)
				.map(action => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={action.name}
						onClick={action.clickHandler}
					/>
				))}
		</SpeedDial>
	);
};

export default ToolbarBtn;
