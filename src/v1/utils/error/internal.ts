import { InternalServerErrorException } from "@nestjs/common";

export const internal = (code: string) => {
	throw new InternalServerErrorException({
		code,
		statusCode: 500,
	});
};
