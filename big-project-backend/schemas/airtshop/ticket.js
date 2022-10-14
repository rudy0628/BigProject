export default {
	name: 'ticket',
	title: 'Ticket',
	type: 'document',
	fields: [
		{
			name: 'arrive',
			title: 'Arrive',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'arriveTime',
			title: 'Arrive Time',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'classType',
			title: 'Class Type',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'depart',
			title: 'Depart',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'departTime',
			title: 'Depart Time',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'duration',
			title: 'Duration',
			type: 'number',
			validation: Rule => Rule.required(),
		},
		{
			name: 'passenger',
			title: 'Passenger',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'price',
			title: 'Price',
			type: 'number',
			validation: Rule => Rule.required(),
		},
	],
};
