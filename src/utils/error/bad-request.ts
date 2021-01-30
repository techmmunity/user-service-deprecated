import { BadRequestException } from "@nestjs/common";

export const badRequest = (code: string, errors: Array<string> = []) => {
	throw new BadRequestException({
		code,
		statusCode: 400,
		errors,
	});
};
