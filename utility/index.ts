import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const createOrGetUser = async (response: any, addUser: any) => {
	const decoded: { name: string; picture: string; sub: string; email: string } =
		jwtDecode(response.credential);
	const { name, picture, sub, email } = decoded;

	// add token into local storage for user authorization(backend)
	localStorage.setItem('token', response.credential);
	// remove the token after 3 days
	setTimeout(() => {
		localStorage.removeItem('token');
	}, 3 * 24 * 60 * 60 * 1000);

	const user = {
		_id: sub,
		_type: 'user',
		userName: name,
		image: picture,
		email: email,
	};

	addUser(user);

	// write into sanity
	await axios
		.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth`, user)
		.catch(error => console.log(error));

	return user.userName;
};

export function getUserDataFromToken(token: string) {
	try {
		const decoded: {
			name: string;
			picture: string;
			sub: string;
			email: string;
		} = jwtDecode(token);

		const { sub } = decoded;
		return sub;
	} catch (e: any) {
		return null;
	}
}

export const getCardOptions = (isDarkMode: boolean) => {
	const CARD_OPTIONS = {
		style: {
			base: {
				iconColor: '#1565c0',
				color: `${isDarkMode ? '#ddd' : '#333'}`,
				fontWeight: 500,
				fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
				fontSize: '16px',
				fontSmoothing: 'antialiased',
				':-webkit-autofill': { color: `${isDarkMode ? '#ddd' : '#333'}` },
				'::placeholder': { color: `${isDarkMode ? '#ddd' : '#333'}` },
			},
			invalid: {
				iconColor: '#f03e3e',
				color: '#f03e3e',
			},
		},
	};

	return CARD_OPTIONS;
};

export const transformTwoDigits = (time: number) => {
	if (time < 10) {
		return `0${time}`;
	} else {
		return `${time}`;
	}
};
