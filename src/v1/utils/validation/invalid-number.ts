import { invalid } from "./helpers/invalid";

export const invalidNumber = (value?: number, optional?: boolean) =>
	invalid("number", value, optional);
