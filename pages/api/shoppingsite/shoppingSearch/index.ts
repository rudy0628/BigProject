import type { NextApiRequest, NextApiResponse } from 'next';
import { searchShoppingItemQuery } from '../../../../utility/queries/shoppingsiteQueries';
import { client } from '../../../../utility/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const { q } = req.query;

		const searchItemQuery = searchShoppingItemQuery(q);
		try {
			const shoppingItems = await client.fetch(searchItemQuery);
			res.status(200).json(shoppingItems);
		} catch (e) {
			res.status(500).json('搜尋商品失敗，請重新再試!');
		}
	}
}
