import { StringSchema } from "yup";

declare module "yup" {
	interface StringSchema {
		emailOrPhone(fieldName: string): StringSchema;
		emailOrUsername(fieldName: string): StringSchema;
		username(): StringSchema;
		password(): StringSchema;
		fullName(): StringSchema;
	}
}
