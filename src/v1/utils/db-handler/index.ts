import { HttpException } from "@nestjs/common";
import { DbHandlerMaker } from "@techmmunity/database-error-handler";

export const DbHandler = DbHandlerMaker({
	throwler: HttpException,
});
