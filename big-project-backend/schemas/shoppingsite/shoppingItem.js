export default {
	name: 'shoppingItem',
	title: 'Shopping Item',
	type: 'document',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'category',
			title: 'Category',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'price',
			title: 'Price',
			type: 'number',
			validation: Rule =>
				Rule.required().min(1).max(999).error('Price should be 1 to 999.'),
		},
		{
			name: 'description',
			title: 'Description',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'imageList',
			title: 'Image List',
			type: 'array',
			of: [{ type: 'imageList' }],
			validation: Rule => Rule.required(),
		},
		{
			name: 'postedBy',
			title: 'Posted By',
			type: 'postedBy',
			validation: Rule => Rule.required(),
		},
		{
			name: 'comments',
			title: 'Comments',
			type: 'array',
			of: [{ type: 'itemComment' }],
		},
		{
			name: 'date',
			title: 'Date',
			type: 'string',
			validation: Rule => Rule.required(),
		},
	],
};
