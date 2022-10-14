export const isNotEmpty = (value: string) => value.trim().length !== 0;
export const priceMaxAndMin = (value: number) => value >= 1 && value <= 1000;
export const isIataCode = (value: any) =>
	value.trim().length === 3 && value === value.toUpperCase() && isNaN(value);
export const isPhoneNumber = (value: string) =>
	value.startsWith('09') && value.length === 10;
export const isEmail = (value: string) =>
	value.trim().length !== 0 && value.includes('@');
