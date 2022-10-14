import useUiStore from './uiStore';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const shoppingCartStore = (set: any) => ({
	cartItems: [],
	totalAmount: 0,
	setTotalAmount: (totalAmount: number) => set({ totalAmount }),
	setCart: async (userId: string) => {
		if (userId === 'no user') {
			return set({ cartItems: [] });
		}
		const token = localStorage.getItem('token');
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/shoppingsite/shoppingCart`,
			{
				params: {
					userId,
				},
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);

		const { shoppingCartItems } = response.data;

		return set({ cartItems: shoppingCartItems });
	},
	addIntoCart: async (itemId: string, amount: number, userId: string) => {
		const token = localStorage.getItem('token');
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/shoppingsite/shoppingCart`,
			{
				itemId,
				amount,
				userId,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const { shoppingCartItems } = response.data;

		return set({ cartItems: shoppingCartItems });
	},
	removeFromCart: async (itemId: string, userId: string) => {
		const token = localStorage.getItem('token');
		const response = await axios.patch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/shoppingsite/shoppingCart`,
			{
				itemId,
				userId,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);

		const { shoppingCartItems } = response.data;

		return set({ cartItems: shoppingCartItems });
	},
	clearCart: async (userId: string) => {
		const token = localStorage.getItem('token');
		const response = await axios.put(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/shoppingsite/shoppingCart`,
			{
				userId,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);

		const { shoppingCartItems } = response.data;

		if (shoppingCartItems.length === 0) {
			return set({ cartItems: [] });
		}
	},
});

const useShoppingCartStore = create(
	persist(shoppingCartStore, {
		name: 'shoppingsite',
	})
);

export default useShoppingCartStore;
