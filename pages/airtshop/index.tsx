import React, { useEffect, useState } from 'react';
import Head from 'next/head';

import useTicketStore from '../../store/ticketStore';

import TicketForm from '../../components/airtshop/tickets/TicketForm';
import Tickets from '../../components/airtshop/tickets/Tickets';
import TicketCheckout from '../../components/airtshop/tickets/TicketCheckout';
import TicketStepper from '../../components/airtshop/tickets/TicketStepper';

import { getPriceFromClassType } from '../../utility/data/airtshopData';
import { AirtshopTicket } from '../../type';

const Airtshop = () => {
	const { tickets, ticketInfo } = useTicketStore();
	const [step, setStep] = useState(1);

	let headTitle = '';
	if (step === 1) {
		headTitle = '找尋機票';
	} else if (step === 2) {
		headTitle = '找尋機票結果';
	} else if (step === 3) {
		headTitle = '填寫訂購資訊與付款';
	}

	let filterTickets: AirtshopTicket[] = [];
	if (
		tickets.length > 0 &&
		ticketInfo.classType !== '' &&
		ticketInfo.passenger !== '' &&
		ticketInfo.date !== 0
	) {
		filterTickets = tickets
			.filter((ticket: any) => new Date() < new Date(ticket.dep_time))
			.map((ticket: any) => ({
				classType: ticketInfo.classType,
				passenger: ticketInfo.passenger,
				price: getPriceFromClassType(ticketInfo.classType, ticket.duration),
				departTime: ticket.dep_time,
				arriveTime: ticket.arr_time,
				duration: ticket.duration,
				depart: ticket.dep_iata,
				arrive: ticket.arr_iata,
			}));
	}

	useEffect(() => {
		setStep(1);
	}, [setStep]);

	return (
		<>
			<Head>
				<title>Airtshop - {headTitle}</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<TicketStepper activeStep={step - 1} />
			{step === 1 && <TicketForm setStep={setStep} />}
			{step === 2 && (
				<Tickets tickets={filterTickets} step={step} setStep={setStep} />
			)}
			{step === 3 && <TicketCheckout setStep={setStep} />}
		</>
	);
};

export default Airtshop;
