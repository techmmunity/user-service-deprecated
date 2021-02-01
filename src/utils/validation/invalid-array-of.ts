import { AllowedTypes, invalid } from "./helpers/invalid";

export const invalidArrayOf = (
	type: AllowedTypes,
	value?: Array<any>,
	optional = false,
	limit = 100, // Limit, to prevent arrays with infinite items
) => {
	if (optional) {
		const isUndefined = typeof value === "undefined";

		if (isUndefined) return false;
	}

	const isArray = Array.isArray(value);

	if (!isArray) return true;

	const valueWithCorrectType = value as Array<any>;

	if (valueWithCorrectType.length > limit) return true;

	const anyItemIsIncorrectValue = valueWithCorrectType.some(val =>
		invalid(type, val),
	);

	if (anyItemIsIncorrectValue) return true;

	return false;
};
