import { AllowedTypes, invalid } from "./helpers/invalid";

export const invalidArrayOf = (
	value: Array<any>,
	type: AllowedTypes,
	optional = false,
	limit = 100, // Limit, to prevent arrays with infinite items
) => {
	if (optional) {
		const isUndefined = typeof value === "undefined";

		if (isUndefined) return false;
	}

	const isArray = Array.isArray(value);

	if (!isArray) return true;

	if (value.length > limit) return true;

	const anyItemIsIncorrectValue = value.some((val) => invalid(type, val));

	if (anyItemIsIncorrectValue) return true;

	return false;
};
