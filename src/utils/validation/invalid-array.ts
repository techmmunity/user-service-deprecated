import { invalid } from "./helpers/invalid";

export const invalidArray = (value?: any, optional?: boolean) =>
	invalid("array", value, optional);
