import { HttpException } from "@nestjs/common";
import { DbHandlerMaker } from "@techmmunity/database-error-handler";

export const dbHandler = DbHandlerMaker({
	throwler: HttpException,
});
