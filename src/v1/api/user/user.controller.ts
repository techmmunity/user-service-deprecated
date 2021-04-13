import { Body, Controller, HttpCode, Param, Post, Put } from "@nestjs/common";
import {
	ApiCreatedResponse,
	ApiOkResponse,
	ApiParam,
	ApiTags,
} from "@nestjs/swagger";
import { v4 } from "uuid";

import { UserService } from "./user.service";

import { CreateUserLocalInputSchema } from "./service/create/local/schemas/input.schema";
import { CreateUserLocalOutputSchema } from "./service/create/local/schemas/output.schema";
import { LoginLocalInputSchema } from "./service/login/local/schemas/input.schema";
import { LoginLocalOutputSchema } from "./service/login/local/schemas/output.schema";
import { RegenPinOutputSchema } from "./service/regen-pin/schemas/output.schema";
import { VerifyUserInputSchema } from "./service/verify/schemas/input.schema";

import { Routes } from "v1/config/routes";

@ApiTags("User")
@Controller(`${Routes.version}/user`)
export class UserController {
	public constructor(private UserService: UserService) {
		//
	}

	@Post(Routes.user.createLocal)
	@ApiCreatedResponse({
		type: CreateUserLocalOutputSchema,
	})
	public createLocal(@Body() data: CreateUserLocalInputSchema) {
		return this.UserService.createLocal(data);
	}

	@HttpCode(200)
	@Post(Routes.user.loginLocal)
	@ApiOkResponse({
		type: LoginLocalOutputSchema,
	})
	public loginLocal(@Body() data: LoginLocalInputSchema) {
		return this.UserService.loginLocal(data);
	}

	@Put(Routes.user.regenPin)
	@ApiParam({
		name: "userId",
		description: "user ID",
		example: v4(),
	})
	@ApiOkResponse({
		type: RegenPinOutputSchema,
	})
	public regenPin(@Param("userId") userId: string) {
		return this.UserService.regenPin({
			userId,
		});
	}

	@HttpCode(204)
	@Put(Routes.user.verify)
	public verify(@Body() params: VerifyUserInputSchema) {
		return this.UserService.verify(params);
	}
}
