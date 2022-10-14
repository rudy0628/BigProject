import type { NextApiRequest, NextApiResponse } from 'next';
import { v2 as cloudinary } from 'cloudinary';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	cloudinary.config({
		cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_APP_ID,
		api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
		api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
	});

	if (req.method === 'PATCH') {
		const { public_id } = req.body;

		try {
			await cloudinary.uploader.destroy(public_id, {
				type: 'upload',
				resource_type: 'image',
			});

			res.status(200).json('刪除圖片成功!');
		} catch (e) {
			res.status(500).json('刪除圖片失敗，請重新再試!');
		}
	}
}
