export default {
	name: 'user',
	title: 'User',
	type: 'document',
	fields: [
		{
			name: 'userName',
			title: 'User Name',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'image',
			title: 'Image',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'email',
			title: 'Email',
			type: 'string',
			validation: Rule => Rule.required(),
		},
	],
};
