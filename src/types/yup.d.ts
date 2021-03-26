import { StringSchema } from "yup";

declare module "yup" {
	interface StringSchema {
		emailOrPhone(): StringSchema;
		username(): StringSchema;
		password(): StringSchema;
		fullName(): StringSchema;
	}
}
