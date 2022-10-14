export default {
	name: 'shoppingCartItem',
	title: 'Shopping Cart Item',
	type: 'document',
	fields: [
		{
			name: 'shoppingItem',
			title: 'Shopping Item',
			type: 'reference',
			weak: true,
			to: [{ type: 'shoppingItem' }],
		},
		{
			name: 'amount',
			title: 'Amount',
			type: 'number',
		},
	],
};
