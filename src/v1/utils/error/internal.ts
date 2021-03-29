import { InternalServerErrorException } from "@nestjs/common";

export const internal = (errors: Array<any>) => {
	throw new InternalServerErrorException({ errors });
};
