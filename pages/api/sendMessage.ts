import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const accountSid = <string>process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
		const token = <string>process.env.NEXT_PUBLIC_TWILIO_TOKEN;
		const client = twilio(accountSid, token);
		const { phone, message } = req.body;

		try {
			await client.messages.create({
				body: message,
				from: '+1 8646190983',
				to: phone,
			});
			res.status(201).json({ success: true });
		} catch (e) {
			res.status(500).json({ success: false });
		}
	}
}
