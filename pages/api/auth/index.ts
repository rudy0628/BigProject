import type { NextApiRequest, NextApiResponse } from 'next';
import { allUsersQuery } from '../../../utility/queries/userQuery';
import { client } from '../../../utility/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const query = allUsersQuery();
		const response = await client.fetch(query);

		res.status(200).json(response);
	}
	if (req.method === 'POST') {
		const user = req.body;

		// create user
		try {
			await client.createIfNotExists(user);
			res.status(200).json('登入成功!');
		} catch (e) {
			res.status(500).send('登入失敗，請重新再試');
		}
	}
}
