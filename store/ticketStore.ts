import create from 'zustand';
import { persist } from 'zustand/middleware';
import { AirtshopTicket } from '../type';
import axios from 'axios';

const ticketStore = (set: any) => ({
	tickets: [],
	selectedTicket: {
		arrive: '',
		arriveTime: '',
		classType: '',
		depart: '',
		departTime: '',
		duration: 0,
		passenger: '',
		price: 0,
	},
	ticketInfo: { classType: '', passenger: '', date: 0 },
	setTickets: async (depart: string, arrive: string) => {
		const flightResponse = await axios.get(
			`https://airlabs.co/api/v9/schedules?dep_iata=${depart}&arr_iata=${arrive}&api_key=${process.env.NEXT_PUBLIC_AIRLABS_API_KEY}`
		);

		const data = flightResponse.data.response;

		set({ tickets: data });
	},
	setSelectedTicket: (ticket: AirtshopTicket) =>
		set({ selectedTicket: ticket }),
	setTicketInfo: (ticketInfo: {
		classType: string;
		passenger: string;
		date: number;
	}) => set({ ticketInfo }),
	resetTickets: () => set({ tickets: [] }),
});

const useTicketStore = create(
	persist(ticketStore, {
		name: 'ticket',
	})
);

export default useTicketStore;
