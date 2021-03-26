import { ConflictException } from "@nestjs/common";

export const conflict = (errors: Array<any> = []) => {
	throw new ConflictException({ errors });
};
