import type { NextApiRequest, NextApiResponse } from 'next';
import { shoppingItemDetailQuery } from '../../../../utility/queries/shoppingsiteQueries';
import { client } from '../../../../utility/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const { id } = req.query;
		const query = shoppingItemDetailQuery(id);

		try {
			const data = await client.fetch(query);
			res.status(200).json(data[0]);
		} catch (e) {
			res.status(500).json('獲取商品資料失敗，請重新再試!');
		}
	}
	if (req.method === 'PATCH') {
		const updatedItem = req.body;
		const { id }: any = req.query;

		try {
			await client.patch(id).set(updatedItem).commit();
			res.status(201).json('商品更新成功!');
		} catch (e) {
			res.status(500).json('商品更新失敗，請重新再試!');
		}
	}
	if (req.method === 'DELETE') {
		const { id }: any = req.query;

		try {
			await client.delete(id);
			res.status(200).json('商品刪除成功!');
		} catch (e) {
			res.status(500).json('商品刪除失敗，請重新再試!');
		}
	}
}
