export default {
	name: 'ticketCart',
	title: 'TicketCart',
	type: 'document',
	fields: [
		{
			name: 'userId',
			title: 'User Id',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'tickets',
			title: 'Tickets',
			type: 'array',
			of: [{ type: 'ticketCartItem' }],
		},
	],
};
