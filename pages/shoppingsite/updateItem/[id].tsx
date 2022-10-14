import React from 'react';
import axios from 'axios';
import { ShoppingDetail } from '../../../type';
import Head from 'next/head';
import ShoppingItemForm from '../../../components/shoppingsite/shoppingItem/ShoppingItemForm';

interface IProps {
	shoppingDetail: ShoppingDetail;
}

const ShoppingsiteUpdateItemPage = ({ shoppingDetail }: IProps) => {
	return (
		<>
			<Head>
				<title>Shoppingsite - 更新商品</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<ShoppingItemForm shoppingDetail={shoppingDetail} />
		</>
	);
};

export const getServerSideProps = async ({
	params: { id },
}: {
	params: { id: string };
}) => {
	try {
		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/shoppingsite/shoppingItem/${id}`
		);
		return {
			props: {
				shoppingDetail: data,
			},
		};
	} catch (e) {
		return {
			props: {
				shoppingDetail: [],
			},
		};
	}
};

export default ShoppingsiteUpdateItemPage;
