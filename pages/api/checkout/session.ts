import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_PRIVATE_KEY}`, {
	apiVersion: '2022-08-01',
});

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// get request body
	const { id, amount, userId, userName, text } = req.body;

	try {
		// create payment intent
		const paymentIntent = await stripe.paymentIntents.create({
			amount: amount,
			currency: 'TWD',
			description: `${userName}(${userId}) 成功支付了 ${
				amount / 100
			} NTD，${text}`,
			payment_method: id,
			confirm: true,
		});

		res.status(200).json({ id: paymentIntent.id, success: true });
	} catch (e) {
		res.status(500).json('付款失敗，請重新再試!');
	}
}
