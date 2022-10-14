import type { NextApiRequest, NextApiResponse } from 'next';
import { allShoppingItemsQuery } from '../../../../utility/queries/shoppingsiteQueries';
import { client } from '../../../../utility/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		// get query string
		const query = allShoppingItemsQuery();

		try {
			// Get all item
			const data = await client.fetch(query);
			res.status(200).json(data);
		} catch (e) {
			res.status(500).json('獲取所有商品失敗，請重新再試!');
		}
	}
	if (req.method === 'POST') {
		const newItem = req.body;

		// return all items
		try {
			await client.createIfNotExists(newItem);
			res.status(201).json('商品新增成功');
		} catch (e) {
			res.status(500).json('商品新增失敗，請重新再試!');
		}
	}
}
