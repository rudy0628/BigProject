export const allUsersQuery = () => {
	const query = `*[_type == "user"]`;

	return query;
};

export const usersQuery = (userName: string | string[] | undefined) => {
	const query = `*[_type == "user" && userName match '${userName}'] {
		_id,
		_type,
		userName,
		image,
		email
	}`;

	return query;
};
