import { HttpException } from "@nestjs/common";
import {
	DbHandlerMaker,
	HttpCodeEnum,
} from "@techmmunity/database-error-handler";

export const dbHandler = DbHandlerMaker({
	throwler: HttpException,
	globalDefaultHandler: {
		error: "default",
		responseCode: HttpCodeEnum.InternalServerError,
		makeError: err => ({
			errors: [err],
		}),
	},
});
