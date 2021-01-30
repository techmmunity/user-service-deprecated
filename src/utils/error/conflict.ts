import { ConflictException } from "@nestjs/common";

export const conflict = (code: string, errors: Array<string> = []) => {
	throw new ConflictException({
		code,
		statusCode: 409,
		errors,
	});
};
