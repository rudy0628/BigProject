import type { NextApiRequest, NextApiResponse } from 'next';
import { shoppingCartQuery } from '../../../../utility/queries/shoppingsiteQueries';
import { client } from '../../../../utility/client';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// Get existed cart
	const getExistCart = async (userId: string | string[] | undefined) => {
		const cartQuery = shoppingCartQuery(userId);
		const existedCart = await client.fetch(cartQuery);

		return existedCart;
	};

	if (req.method === 'GET') {
		const { userId } = req.query;

		// Get existed cart
		let existedCart;
		try {
			existedCart = await getExistCart(userId);
		} catch (e) {
			res.status(500).json('獲取購物車資料失敗，請重新再試!');
		}

		const { shoppingCartItems, _id } = existedCart[0];

		if (existedCart.length !== 0 && shoppingCartItems !== null) {
			// Update the cart if the item is remove
			const updatedShoppingCartItems = shoppingCartItems
				.filter((item: any) => item.shoppingItem !== null)
				.map((item: any) => ({
					_key: item._key,
					amount: item.amount,
					shoppingItem: {
						_type: 'reference',
						_ref: item.shoppingItem._id,
						_weak: true,
					},
				}));

			// update the sanity
			try {
				await client
					.patch(_id)
					.set({ shoppingCartItems: updatedShoppingCartItems })
					.commit();
			} catch (e) {
				res.status(500).json('購物車更新失敗，請重新再試!');
			}

			// get the update existed cart
			let existedCart;
			try {
				existedCart = await getExistCart(userId);
			} catch (e) {
				res.status(500).json('獲取購物車資料失敗，請重新再試!');
			}

			res
				.status(200)
				.json({ shoppingCartItems: existedCart[0].shoppingCartItems });
		} else {
			res.status(200).json({ shoppingCartItems: [] });
		}
	}

	if (req.method === 'POST') {
		const { itemId, amount, userId } = req.body;
		// Get existed cart
		let existedCart;
		try {
			existedCart = await getExistCart(userId);
		} catch (e) {
			res.status(500).json('獲取購物車資料失敗，請重新再試!');
		}

		// if cart is not find
		if (existedCart.length === 0) {
			// new cartItem object
			const newCartItem = {
				_id: uuidv4(),
				_type: 'shoppingCart',
				userId,
				shoppingCartItems: [
					{
						_key: uuidv4(),
						shoppingItem: {
							_type: 'reference',
							_ref: itemId,
							_weak: true,
						},
						amount,
					},
				],
			};

			// create cart and add item into cart
			try {
				await client.createIfNotExists(newCartItem);
			} catch (e) {
				res.status(500).json('加入購物車商品失敗，請重新再試!');
			}

			// Initial add into the cart, fetch the cart again after item added to the cart.
			let existedCart;
			try {
				existedCart = await getExistCart(userId);
			} catch (e) {
				res.status(500).json('獲取購物車資料失敗，請重新再試!');
			}

			res
				.status(200)
				.json({ shoppingCartItems: existedCart[0].shoppingCartItems });
		} else {
			// If cart is existed
			// Find the exist all items
			const { shoppingCartItems, _id } = existedCart[0];
			let existedItem;

			// Find the item which user want to add into cart
			if (shoppingCartItems && shoppingCartItems.length > 0) {
				existedItem = shoppingCartItems.find(
					(item: any) => item.shoppingItem._id === itemId
				);
			}

			// if not exist item, create item and insert into shoppingCartItems
			if (
				!shoppingCartItems ||
				shoppingCartItems.length === 0 ||
				!existedItem
			) {
				// add new item into shopping cart
				try {
					await client
						.patch(_id)
						.setIfMissing({ shoppingCartItems: [] })
						.insert('after', 'shoppingCartItems[-1]', [
							{
								_key: uuidv4(),
								shoppingItem: {
									_type: 'reference',
									_ref: itemId,
									_weak: true,
								},
								amount,
							},
						])
						.commit();
				} catch (e) {
					res.status(500).json('加入購物車商品失敗，請重新再試!');
				}

				// Initial add into the cart, fetch the cart again after item added into the cart.
				let existedCart;
				try {
					existedCart = await getExistCart(userId);
				} catch (e) {
					res.status(500).json('獲取購物車資料失敗，請重新再試!');
				}

				res
					.status(200)
					.json({ shoppingCartItems: existedCart[0].shoppingCartItems });
			} else {
				// if exist item, update the item amount

				// Update the shopping cart items
				const updatedShoppingCartItems = shoppingCartItems.map((item: any) => {
					if (item.shoppingItem._id === itemId) {
						item.amount += amount;
					}
					return {
						_key: item._key,
						amount: item.amount,
						shoppingItem: {
							_type: 'reference',
							_ref: item.shoppingItem._id,
							_weak: true,
						},
					};
				});

				// update the shopping cart items
				try {
					await client
						.patch(_id)
						.set({ shoppingCartItems: updatedShoppingCartItems })
						.commit();
				} catch (e) {
					res.status(500).json('商品數量更新失敗，請重新再試!');
				}

				// get existedCart
				let existedCart;
				try {
					existedCart = await getExistCart(userId);
				} catch (e) {
					res.status(500).json('獲取購物車資料失敗，請重新再試!');
				}

				res
					.status(200)
					.json({ shoppingCartItems: existedCart[0].shoppingCartItems });
			}
		}
	}

	if (req.method === 'PATCH') {
		const { itemId, userId } = req.body;

		// Get existed cart
		let existedCart;
		try {
			existedCart = await getExistCart(userId);
		} catch (e) {
			res.status(500).json('獲取購物車資料失敗，請重新再試!');
		}

		// if cart existed
		if (existedCart) {
			// Find the exist all items
			const { shoppingCartItems, _id } = existedCart[0];
			let existedItem;

			// If shoppingCartItems existed, find the item which user want to add into cart
			if (shoppingCartItems && shoppingCartItems.length > 0) {
				existedItem = shoppingCartItems.find(
					(item: any) => item.shoppingItem._id === itemId
				);
			}

			// If existedItem amount > 1
			if (existedItem.amount > 1) {
				// Create the update shoppingCartItems
				const updatedShoppingCartItems = shoppingCartItems.map((item: any) => {
					if (item.shoppingItem._id === itemId) {
						item.amount -= 1;
					}
					return {
						_key: item._key,
						amount: item.amount,
						shoppingItem: {
							_type: 'reference',
							_ref: item.shoppingItem._id,
							_weak: true,
						},
					};
				});

				// update the shoppingCartItems
				try {
					await client
						.patch(_id)
						.set({ shoppingCartItems: updatedShoppingCartItems })
						.commit();
				} catch (e) {
					res.status(500).json('更新購物車失敗，請重新再試!');
				}

				// fetch existed cart
				let existedCart;
				try {
					existedCart = await getExistCart(userId);
				} catch (e) {
					res.status(500).json('獲取購物車資料失敗，請重新再試!');
				}

				res
					.status(200)
					.json({ shoppingCartItems: existedCart[0].shoppingCartItems });
			} else if (existedItem.amount === 1) {
				// If the amount is 1, delete the item from cart
				// Create the updated shoppingCartItems
				const updatedShoppingCartItems = shoppingCartItems
					.filter((item: any) => item.shoppingItem._id !== itemId)
					.map((item: any) => ({
						_key: item._key,
						amount: item.amount,
						shoppingItem: {
							_type: 'reference',
							_ref: item.shoppingItem._id,
							_weak: true,
						},
					}));

				// update the shoppingCartItems
				try {
					await client
						.patch(_id)
						.set({ shoppingCartItems: updatedShoppingCartItems })
						.commit();
				} catch (e) {
					res.status(500).json('購物車更新失敗，請重新再試!');
				}

				// fetch existed cart
				let existedCart;
				try {
					existedCart = await getExistCart(userId);
				} catch (e) {
					res.status(500).json('獲取購物車資料失敗，請重新再試!');
				}

				res.status(200).json({
					shoppingCartItems: existedCart
						? existedCart[0].shoppingCartItems
						: [],
				});
			}
		}
	}

	if (req.method === 'PUT') {
		const { userId } = req.body;
		let existedCart;
		try {
			existedCart = await getExistCart(userId);
		} catch (e) {
			res.status(500).json('獲取購物車資料失敗，請重新再試!');
		}

		// Reset the shoppingCartItems
		try {
			await client
				.patch(existedCart[0]._id)
				.unset(['shoppingCartItems'])
				.commit();

			res.status(200).json({ shoppingCartItems: [] });
		} catch (e) {
			res.status(500).json('購物車清空失敗，請重新再試!');
		}
	}
}
