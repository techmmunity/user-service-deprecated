import { UnauthorizedException } from "@nestjs/common";

export const unauthorized = (errors: Array<any>) => {
	throw new UnauthorizedException({ errors });
};
