import React from 'react';
import { Container } from '@mui/material';
import Head from 'next/head';
import ShoppingDetail from '../../components/shoppingsite/shoppingDetail/ShoppingDetail';
import ShoppingComments from '../../components/shoppingsite/shoppingDetail/ShoppingComments';
import { ShoppingSide } from '../../components/shoppingsite/shoppingSide';

import { ShoppingDetail as IShoppingDetail } from '../../type';
import axios from 'axios';

interface IProps {
	shoppingDetail: IShoppingDetail;
}

const ShoppingsiteDetailPage = ({ shoppingDetail }: IProps) => {
	return (
		<>
			<Head>
				<title>Shoppingsite - {shoppingDetail.title}</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Container maxWidth="lg">
				<ShoppingDetail shoppingDetail={shoppingDetail} />
				<ShoppingComments
					shoppingComments={shoppingDetail.comments}
					shoppingItemId={shoppingDetail._id}
				/>
				<ShoppingSide />
			</Container>
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
				shoppingDetail: null,
			},
		};
	}
};

export default ShoppingsiteDetailPage;
