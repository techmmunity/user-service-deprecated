import { Body, Controller, HttpCode, Patch, Post } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiTags,
} from "@nestjs/swagger";

import { ConfirmationTokenService } from "./confirmation-token.service";

import { CreateConfirmationTokenBadRequestSchema } from "./service/create/schemas/bad-request.schema";
import { CreateConfirmationTokenInputSchema } from "./service/create/schemas/input.schema";
import { CreateConfirmationTokenOutputSchema } from "./service/create/schemas/output.schema";
import { VerifyConfirmationTokenBadRequestSchema } from "./service/verify/schemas/bad-request.schema";
import { VerifyConfirmationTokenInputSchema } from "./service/verify/schemas/input.schema";
import { VerifyConfirmationTokenNotFoundSchema } from "./service/verify/schemas/not-found.schema";

import { ApiConfig } from "v1/config";

@ApiTags("Confirmation Token")
@Controller(`${ApiConfig.version}/confirmation-token`)
export class ConfirmationTokenController {
	public constructor(
		private readonly ConfirmationTokenService: ConfirmationTokenService,
	) {}

	@Post()
	@ApiCreatedResponse({
		type: CreateConfirmationTokenOutputSchema,
	})
	@ApiBadRequestResponse({
		type: CreateConfirmationTokenBadRequestSchema,
	})
	public create(@Body() params: CreateConfirmationTokenInputSchema) {
		return this.ConfirmationTokenService.create(params);
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
