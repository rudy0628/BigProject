export const ticketCartQuery = (userId: string | string[] | undefined) => {
	const query = `*[_type == "ticketCart" && userId == '${userId}'] {
    _id,
    userId,
    tickets[] {
      _key,
      fullName,
      email,
      phoneNumber,
      boardingGate,
      seat,
      ticket {
        arrive,
        arriveTime,
        classType,
        depart,
        departTime,
        duration,
        passenger,
        price
      }
    }
  }`;

	return query;
};
