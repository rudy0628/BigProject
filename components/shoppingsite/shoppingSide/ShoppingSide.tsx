import React, { useState } from 'react';
import {
	ToolbarBtn,
	ShoppingCategoryBar,
	ShoppingCart,
	ShoppingSearch,
} from './index';

const ShoppingsiteSide = () => {
	const [categoryIsOpen, setCategoryIsOpen] = useState(false);
	const [cartIsOpen, setCartIsOpen] = useState(false);
	const [searchIsOpen, setSearchIsOpen] = useState(false);

	return (
		<>
			<ToolbarBtn
				setCartIsOpen={setCartIsOpen}
				setCategoryIsOpen={setCategoryIsOpen}
				setSearchIsOpen={setSearchIsOpen}
			/>
			<ShoppingCategoryBar
				setCategoryIsOpen={setCategoryIsOpen}
				categoryIsOpen={categoryIsOpen}
			/>
			<ShoppingCart cartIsOpen={cartIsOpen} setCartIsOpen={setCartIsOpen} />
			<ShoppingSearch
				searchIsOpen={searchIsOpen}
				setSearchIsOpen={setSearchIsOpen}
			/>
		</>
	);
};

export default ShoppingsiteSide;
