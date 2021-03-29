import { BadRequestException } from "@nestjs/common";

export const badRequest = (errors: Array<any> = []) => {
	throw new BadRequestException({ errors });
};
