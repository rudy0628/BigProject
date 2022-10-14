import type { NextApiRequest, NextApiResponse } from 'next';
import { usersQuery } from '../../../utility/queries/userQuery';
import { client } from '../../../utility/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const { userName } = req.query;
		const query = usersQuery(userName);
		const response = await client.fetch(query);

		res.status(200).json(response);
	}
}
