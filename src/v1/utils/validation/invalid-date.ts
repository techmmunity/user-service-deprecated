import { invalid } from "./helpers/invalid";

export const invalidDate = (value?: any, optional?: boolean) =>
	invalid("date", value, optional);
