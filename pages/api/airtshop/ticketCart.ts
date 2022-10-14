import type { NextApiRequest, NextApiResponse } from 'next';
import { ticketCartQuery } from '../../../utility/queries/airtshopQuery';
import { client } from '../../../utility/client';
import { TicketCartItem } from '../../../type';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const { userId } = req.query;
		const query = ticketCartQuery(userId);

		try {
			const cart = await client.fetch(query);
			if (cart.length === 0) {
				res.status(200).json({ ticketCartItems: [] });
			}
			res.status(200).json({ ticketCartItems: cart[0].tickets });
		} catch (e) {
			res.status(500).json('獲取已訂購機票失敗!');
		}
	}

	if (req.method === 'POST') {
		const { userId, newTicket } = req.body;
		const query = ticketCartQuery(userId);

		// get exist cart
		let cart;
		try {
			cart = await client.fetch(query);
		} catch (e) {
			res.status(500).json('獲取已訂購機票失敗!');
		}

		if (cart.length === 0) {
			// If cart is not exist
			const newCartItem = {
				_id: uuidv4(),
				_type: 'ticketCart',
				userId,
				tickets: [newTicket],
			};

			try {
				await client.createIfNotExists(newCartItem);
				res.status(201).json('機票訂購成功!');
			} catch (e) {
				res.status(500).json('機票訂購失敗!');
			}
		} else {
			// If cart is exist
			const { _id } = cart[0];
			try {
				await client
					.patch(_id)
					.setIfMissing({ tickets: [] })
					.insert('after', 'tickets[-1]', [newTicket])
					.commit();

				res.status(201).json('機票訂購成功!');
			} catch (e) {
				res.status(500).json('機票訂購失敗!');
			}
		}
	}

	if (req.method === 'PATCH') {
		const { userId, ticketId } = req.body;
		const query = ticketCartQuery(userId);

		// find existed user cart
		let cart;
		try {
			cart = await client.fetch(query);
		} catch (e) {
			res.status(500).json('獲取已訂購機票失敗!');
		}

		// if cart not exist or cart.length === 0
		if (!cart || cart.length === 0) {
			res.status(500).json('獲取已訂購機票失敗!');
		}

		// find existed ticket
		const { tickets, _id } = cart[0];
		const existedTicket = tickets.find(
			(ticket: TicketCartItem) => ticket._key === ticketId
		);

		if (existedTicket) {
			// update the tickets
			const filterTickets = tickets.filter(
				(ticket: TicketCartItem) => ticket._key !== ticketId
			);

			// remove tickets from zustand
			try {
				await client.patch(_id).set({ tickets: filterTickets }).commit();
				res.status(201).json('移除機票成功!');
			} catch (e) {
				res.status(400).json('移除機票失敗，請再試一次!');
			}
		} else {
			res.status(500).json('獲取已訂購機票失敗!');
		}
	}
}
