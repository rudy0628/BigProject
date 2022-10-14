import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../../../utility/client';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const { comment, review, userId } = req.body;
		const { id }: any = req.query;

		try {
			await client
				.patch(id)
				.setIfMissing({ comments: [] })
				.insert('after', 'comments[-1]', [
					{
						comment,
						review,
						_key: uuidv4(),
						postedBy: { _type: 'postedBy', _ref: userId },
					},
				])
				.commit();

			res.status(200).json('新增留言成功!');
		} catch (e) {
			res.status(200).json('新增留言失敗!');
		}
	}
	if (req.method === 'PATCH') {
		const { key } = req.body;
		const { id }: any = req.query;

		try {
			await client
				.patch(id)
				.unset([`comments[_key=="${key}"]`])
				.commit();

			res.status(200).json('刪除留言成功!');
		} catch (e) {
			res.status(200).json('刪除留言失敗!');
		}
	}
}
