export default {
	name: 'shoppingCart',
	title: 'ShoppingCart',
	type: 'document',
	fields: [
		{
			name: 'userId',
			title: 'User Id',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'shoppingCartItems',
			title: 'Shopping Cart Items',
			type: 'array',
			of: [{ type: 'shoppingCartItem' }],
		},
	],
};
