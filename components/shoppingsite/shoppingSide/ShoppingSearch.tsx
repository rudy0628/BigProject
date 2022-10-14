import React, { useState } from 'react';
import { Container, Drawer, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import useUiStore from '../../../store/uiStore';
import { useRouter } from 'next/router';

interface IProps {
	searchIsOpen: boolean;
	setSearchIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShoppingSearch = ({ searchIsOpen, setSearchIsOpen }: IProps) => {
	const [searchValue, setSearchValue] = useState('');
	const router = useRouter();
	const { setSearchText } = useUiStore();

	const handleSearch = () => {
		if (searchValue) {
			router.push(`/shoppingsite?q=${searchValue}`);
			setSearchValue('');
			setSearchText(`搜尋 ${searchValue} 結果：`);
			setSearchIsOpen(false);
		}
	};

	return (
		<Drawer
			anchor="top"
			open={searchIsOpen}
			onClose={() => setSearchIsOpen(false)}
		>
			<Container maxWidth="md" sx={{ padding: '0.5rem' }}>
				<InputBase
					sx={{ flex: 1, width: '90%' }}
					placeholder="搜尋商品"
					inputProps={{ 'aria-label': '搜尋商品' }}
					value={searchValue}
					onChange={e => setSearchValue(e.target.value)}
				/>
				<IconButton
					type="button"
					sx={{ p: '10px' }}
					aria-label="search"
					onClick={handleSearch}
				>
					<SearchIcon />
				</IconButton>
			</Container>
		</Drawer>
	);
};

export default ShoppingSearch;
