import { NotFoundException } from "@nestjs/common";

export const notFound = (code: string, errors: Array<string> = []) => {
	throw new NotFoundException({
		code,
		statusCode: 404,
		errors,
	});
};
