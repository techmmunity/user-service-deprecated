import { invalid } from "./helpers/invalid";

export const invalidString = (value?: string, optional?: boolean) =>
	invalid("string", value, optional);
