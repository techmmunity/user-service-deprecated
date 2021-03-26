import { ForbiddenException } from "@nestjs/common";

export const forbidden = (errors: Array<any> = []) => {
	throw new ForbiddenException({ errors });
};
