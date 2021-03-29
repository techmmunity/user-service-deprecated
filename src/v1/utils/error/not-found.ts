import { NotFoundException } from "@nestjs/common";

export const notFound = (errors: Array<string> = []) => {
	throw new NotFoundException({ errors });
};
