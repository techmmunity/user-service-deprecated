import { invalid } from "./helpers/invalid";

export const invalidObject = (value?: any, optional?: boolean) =>
	invalid("object", value, optional);
