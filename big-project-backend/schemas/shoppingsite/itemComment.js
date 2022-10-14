export default {
	name: 'itemComment',
	title: 'Item Comment',
	type: 'document',
	fields: [
		{
			name: 'postedBy',
			title: 'Posted By',
			type: 'postedBy',
			validation: Rule => Rule.required(),
		},
		{
			name: 'comment',
			title: 'Comment',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'review',
			title: 'Review',
			type: 'number',
			validation: Rule =>
				Rule.required().min(1).max(5).error('Comment review should be 1 to 5.'),
		},
	],
};
