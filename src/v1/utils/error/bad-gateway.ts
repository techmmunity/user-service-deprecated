import { BadGatewayException } from "@nestjs/common";

export const badGateway = (errors: Array<any> = []) => {
	throw new BadGatewayException({ errors });
};
