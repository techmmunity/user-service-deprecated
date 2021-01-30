import { UnauthorizedException } from "@nestjs/common";

export const unauthorized = (code: string) => {
	throw new UnauthorizedException({
		code,
		statusCode: 403,
	});
};
