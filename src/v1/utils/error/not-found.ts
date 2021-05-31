import { NotFoundException } from "@nestjs/common";

export const notFound = (errors: Array<any> = []) => {
	throw new NotFoundException({ errors });
};
