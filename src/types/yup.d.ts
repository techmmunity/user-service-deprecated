import { StringSchema } from "yup";

declare module "yup" {
	interface StringSchema {
		username(): StringSchema;
		password(): StringSchema;
		fullName(): StringSchema;
	}
}
