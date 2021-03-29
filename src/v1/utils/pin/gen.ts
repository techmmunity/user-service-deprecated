import { Limits } from "v1/config/limits";

/**
 * Generates random PIN
 */
export const gen = (length = Limits.user.pin.length) => {
	/**
	 * Generates a number composed of 9s, based on the length
	 * Ex: 9, 99, 999, 9999, ...
	 */
	const MAX = Number("9".repeat(length));

	// Generates a random PIN
	const pin = Math.random() * MAX;

	// Fix the PIN length and returns
	return `${Math.floor(pin)}`.padStart(length, "0");
};
