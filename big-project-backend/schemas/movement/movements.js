export default {
	name: 'movements',
	title: 'Movements',
	type: 'document',
	fields: [
		{
			name: 'user',
			title: 'User',
			type: 'postedBy',
		},
		{
			name: 'product',
			title: 'Product',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'movement',
			title: 'Movement',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'totalPrice',
			title: 'Total Price',
			type: 'number',
			validation: Rule => Rule.required(),
		},
		{
			name: 'date',
			title: 'Date',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'itemUrl',
			title: 'Item URL',
			type: 'string',
			validation: Rule => Rule.required(),
		},
	],
};
