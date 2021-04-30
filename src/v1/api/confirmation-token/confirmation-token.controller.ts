import { Body, Controller, HttpCode, Patch } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiNotFoundResponse,
	ApiTags,
} from "@nestjs/swagger";

import { ConfirmationTokenService } from "./confirmation-token.service";

import { VerifyConfirmationTokenBadRequestSchema } from "./service/verify/schemas/bad-request.schema";
import { VerifyConfirmationTokenInputSchema } from "./service/verify/schemas/input.schema";
import { VerifyConfirmationTokenNotFoundSchema } from "./service/verify/schemas/not-found.schema";

import { ApiConfig } from "v1/config";

@ApiTags("Confirmation Token")
@Controller(`${ApiConfig.version}/confirmation-token`)
export class ConfirmationTokenController {
	public constructor(
		private readonly ConfirmationTokenService: ConfirmationTokenService,
	) {
		//
	}

	@Patch("/verify")
	@HttpCode(204)
	@ApiBadRequestResponse({
		type: VerifyConfirmationTokenBadRequestSchema,
	})
	@ApiNotFoundResponse({
		type: VerifyConfirmationTokenNotFoundSchema,
	})
	public verify(@Body() params: VerifyConfirmationTokenInputSchema) {
		return this.ConfirmationTokenService.verify(params);
	}
}
