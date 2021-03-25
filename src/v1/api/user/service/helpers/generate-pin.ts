import { Limits } from "v1/config/limits";

export const generatePIN = () => {
	const MIN = 0;
	const MAX = 9999;

	const pin = Math.random() * (MAX - MIN) + MIN;

	return `${Math.floor(pin)}`.padStart(Limits.user.pin.max, "0");
};
