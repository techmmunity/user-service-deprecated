import { StringSchema } from "yup";

declare module "yup" {
	interface StringSchema {
		emailOrPhone(): StringSchema;
		identifier(): StringSchema;
		username(): StringSchema;
		password(): StringSchema;
		fullName(): StringSchema;
	}
}
