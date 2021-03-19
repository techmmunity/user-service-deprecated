import { ForbiddenException } from "@nestjs/common";

export const forbidden = (code: string, errors: Array<string> = []) => {
	throw new ForbiddenException({
		code,
		statusCode: 403,
		errors,
	});
};
