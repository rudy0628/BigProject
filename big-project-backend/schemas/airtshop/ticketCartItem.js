export default {
	name: 'ticketCartItem',
	title: 'TicketCartItem',
	type: 'document',
	fields: [
		{
			name: 'ticket',
			title: 'Ticket',
			type: 'ticket',
		},
		{
			name: 'fullName',
			title: 'Full Name',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'email',
			title: 'Email',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'phoneNumber',
			title: 'Phone Number',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'boardingGate',
			title: 'Boarding Gate',
			type: 'string',
			validation: Rule => Rule.required(),
		},
		{
			name: 'seat',
			title: 'Seat',
			type: 'string',
			validation: Rule => Rule.required(),
		},
	],
};
