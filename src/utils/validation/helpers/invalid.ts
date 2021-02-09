export type AllowedTypes =
	| "string"
	| "boolean"
	| "number"
	| "array"
	| "object"
	| "date";

export const invalid = (type: AllowedTypes, value: any, optional?: boolean) => {
	if (optional && typeof value === "undefined") {
		return false;
	}

	switch (type) {
		case "boolean":
		case "number":
		case "string":
			return typeof value !== type;
		case "array":
			return !Array.isArray(value);
		case "object":
			return Object.prototype.toString.call(value) !== "[object Object]";
		case "date":
			return (
				Object.prototype.toString.call(value) !== "[object Date]" ||
				isNaN(value?.getTime())
			);
	}
};
