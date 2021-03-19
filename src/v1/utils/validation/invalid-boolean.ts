import { invalid } from "./helpers/invalid";

export const invalidBoolean = (value?: boolean, optional?: boolean) =>
	invalid("boolean", value, optional);
