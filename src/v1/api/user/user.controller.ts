import { Body, Controller, HttpCode, Param, Patch, Post } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiParam,
	ApiTags,
} from "@nestjs/swagger";
import { v4 } from "uuid";

import { UserService } from "./user.service";

import { CreateUserLocalBadRequestSchema } from "./service/create/local/schemas/bad-request.schema";
import { CreateUserLocalConflictSchema } from "./service/create/local/schemas/conflict.schema";
import { CreateUserLocalInputSchema } from "./service/create/local/schemas/input.schema";
import { CreateUserLocalOutputSchema } from "./service/create/local/schemas/output.schema";
import { LoginLocalBadRequestSchema } from "./service/login/local/schemas/bad-request.schema";
import { LoginLocalForbiddenSchema } from "./service/login/local/schemas/forbidden.schema";
import { LoginLocalInputSchema } from "./service/login/local/schemas/input.schema";
import { LoginLocalNotFoundSchema } from "./service/login/local/schemas/not-found.schema";
import { LoginLocalOutputSchema } from "./service/login/local/schemas/output.schema";
import { RegenPinBadRequestSchema } from "./service/regen-pin/schemas/bad-request.schema";
import { RegenPinNotFoundSchema } from "./service/regen-pin/schemas/not-found.schema";
import { RegenPinOutputSchema } from "./service/regen-pin/schemas/output.schema";

import { ApiConfig } from "v1/config";

@ApiTags("User")
@Controller(`${ApiConfig.version}/user`)
export class UserController {
	public constructor(private readonly UserService: UserService) {
		//
	}

	@Post("/create/local")
	@ApiCreatedResponse({
		type: CreateUserLocalOutputSchema,
	})
	@ApiConflictResponse({
		type: CreateUserLocalConflictSchema,
	})
	@ApiBadRequestResponse({
		type: CreateUserLocalBadRequestSchema,
	})
	public createLocal(@Body() data: CreateUserLocalInputSchema) {
		return this.UserService.createLocal(data);
	}

	@HttpCode(200)
	@Post("/login/local")
	@ApiOkResponse({
		type: LoginLocalOutputSchema,
	})
	@ApiBadRequestResponse({
		type: LoginLocalBadRequestSchema,
	})
	@ApiForbiddenResponse({
		type: LoginLocalForbiddenSchema,
	})
	@ApiNotFoundResponse({
		type: LoginLocalNotFoundSchema,
	})
	public loginLocal(@Body() data: LoginLocalInputSchema) {
		return this.UserService.loginLocal(data);
	}

	@Patch("/regen-pin/:userId")
	@ApiParam({
		name: "userId",
		description: "user ID",
		example: v4(),
	})
	@ApiOkResponse({
		type: RegenPinOutputSchema,
	})
	@ApiBadRequestResponse({
		type: RegenPinBadRequestSchema,
	})
	@ApiNotFoundResponse({
		type: RegenPinNotFoundSchema,
	})
	public regenPin(@Param("userId") userId: string) {
		return this.UserService.regenPin({
			userId,
		});
	}
}
