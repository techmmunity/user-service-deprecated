export const generatePIN = () => {
	const MIN = 0;
	const MAX = 9999;

	const pin = Math.random() * (MAX - MIN) + MIN;

	return `${Math.floor(pin)}`.padStart(4, "0");
};
