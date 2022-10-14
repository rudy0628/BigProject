export default {
	name: 'imageList',
	title: 'Image list',
	type: 'document',
	fields: [
		{
			name: 'url',
			title: 'Url',
			type: 'string',
			validation: Rule =>
				Rule.custom(imageUrl => {
					return imageUrl.startsWith('https://res.cloudinary.com/')
						? true
						: 'Invalid image url';
				}).error(),
		},
		{
			name: 'public_id',
			title: 'Public Id',
			type: 'string',
			validation: Rule => Rule.required(),
		},
	],
};
