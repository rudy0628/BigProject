export const allMovementsQuery = () => {
	const query = `*[_type == "movements"] | order(_createdAt desc) {
    _id,
    user->{
      _id,
      userName,
      image,
      email
    },
    product,
    movement,
    totalPrice,
    date,
    itemUrl
  }`;

	return query;
};
