import React, { useState } from 'react';
import { Container, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';

const MovementSearch = () => {
	const [searchUser, setSearchUser] = useState<string>('');
	const router = useRouter();

	const handleSearch = () => {
		if (searchUser === '') {
			return;
		}

		router.push(`/movement/users?q=${searchUser}`);
	};

	return (
		<Container maxWidth="md" sx={{ padding: '0.5rem', display: 'flex' }}>
			<InputBase
				sx={{ flex: 1 }}
				placeholder="搜尋動態"
				inputProps={{ 'aria-label': '搜尋動態' }}
				value={searchUser}
				onChange={e => setSearchUser(e.target.value)}
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
	);
};

export default MovementSearch;
