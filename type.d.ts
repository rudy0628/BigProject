export interface User {
	_id: string;
	_type: string;
	userName: string;
	image: string;
	email: string;
}

// Shoppingsite
export interface ShoppingItem {
	_id: string;
	title: string;
	price: string;
	description: string;
	imageList: {
		url: string;
		public_id: string;
	}[];
	postedBy: {
		_id: string;
		userName: string;
		image: string;
		email: string;
	};
	comments: {
		review: number;
	}[];
	date: string;
}

export interface ShoppingCartItem {
	_key: string;
	amount: number;
	shoppingItem: ShoppingItem;
}

export interface ShoppingDetail {
	_id: string;
	title: string;
	category: string;
	price: string;
	description: string;
	imageList: {
		url: string;
		public_id: string;
	}[];
	postedBy: {
		_id: string;
		userName: string;
		image: string;
		email: string;
	};
	comments: {
		_key: string;
		comment: string;
		review: number;
		postedBy: {
			_id: string;
			userName: string;
		};
	}[];
	date: string;
}

export interface ShoppingComment {
	_key: string;
	comment: string;
	review: number;
	postedBy: {
		_id: string;
		userName: string;
	};
}

// airtshop
export interface AirtshopTicket {
	arrive: string;
	arriveTime: string;
	classType: string | string[] | undefined;
	depart: string;
	departTime: string;
	duration: number;
	passenger: string | string[] | undefined;
	price: number;
}

export interface TicketCartItem {
	_key: string;
	boardingGate: string;
	email: string;
	fullName: string;
	phoneNumber: string;
	seat: string;
	ticket: AirtshopTicket;
}

// Movement
export interface Movement {
	_id: string;
	date: string;
	movement: string;
	product: string;
	itemUrl: string;
	totalPrice: number;
	user: {
		_id: string;
		email: string;
		image: string;
		userName: string;
	};
}
