import React, { useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { ShoppingSide } from '../../components/shoppingsite/shoppingSide';
import ShoppingItems from '../../components/shoppingsite/shoppingItem/ShoppingItems';

import useShoppingCartStore from '../../store/shoppingCartStore';
import useAuthStore from '../../store/authStore';

import { ShoppingItem } from '../../type';

interface IProps {
	shoppingItems: ShoppingItem[];
}

const ShoppingsitePage = ({ shoppingItems }: IProps) => {
	const { setCart } = useShoppingCartStore();
	const { userProfile }: any = useAuthStore();

	useEffect(() => {
		if (userProfile) {
			setCart(userProfile._id);
		} else {
			setCart('no user');
		}
	}, [setCart, userProfile]);

	return (
		<>
			<Head>
				<title>Shoppingsite - 所有商品</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<ShoppingSide />
			<ShoppingItems shoppingItems={shoppingItems} />
		</>
	);
};

export const getServerSideProps = async ({
	query: { q },
}: {
	query: { q: string };
}) => {
	let response: any;
	if (q) {
		const encodeItem = encodeURIComponent(q);
		try {
			response = await axios.get(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/shoppingsite/shoppingSearch?q=${encodeItem}`
			);
		} catch (e) {
			return {
				props: {
					shoppingItems: [],
				},
			};
		}
	} else {
		try {
			response = await axios.get(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/shoppingsite/shoppingItem`
			);
		} catch (e) {
			return {
				props: {
					shoppingItems: [],
				},
			};
		}
	}

	return {
		props: {
			shoppingItems: response.data,
		},
	};
};

export default ShoppingsitePage;
