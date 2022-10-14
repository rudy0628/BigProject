import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../utility/client';
import { allMovementsQuery } from '../../../utility/queries/movementQuery';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const query = allMovementsQuery();

		try {
			const data = await client.fetch(query);
			res.status(200).json(data);
		} catch (e) {
			res.status(500).json('獲取所有動態失敗，請再試一次!');
		}
	}
	if (req.method === 'POST') {
		const movement = req.body;
		try {
			await client.createIfNotExists(movement);
			res.status(201).json('新增動態成功!');
		} catch (e) {
			res.status(500).json('新增動態失敗!');
		}
	}
}
