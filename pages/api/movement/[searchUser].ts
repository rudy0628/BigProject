import type { NextApiRequest, NextApiResponse } from 'next';
import { allMovementsQuery } from '../../../utility/queries/movementQuery';
import { client } from '../../../utility/client';
import { Movement } from '../../../type';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const { searchUser }: any = req.query;
		const query = allMovementsQuery();
		try {
			const response = await client.fetch(query);
			const userMovements = response.filter(
				(movement: Movement) => movement.user.userName === searchUser
			);
			res.status(200).json(userMovements);
		} catch (e) {
			res.status(500).json('獲取動態失敗，請再試一次!');
		}
	}
}
