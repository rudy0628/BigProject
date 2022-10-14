import Head from 'next/head';
import ShoppingItemForm from '../../components/shoppingsite/shoppingItem/ShoppingItemForm';

const ShoppingsiteAddItemPage = () => {
	return (
		<>
			<Head>
				<title>Shoppingsite - 新增商品</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<ShoppingItemForm />
		</>
	);
};

export default ShoppingsiteAddItemPage;
