import { Body, Controller, HttpCode, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { UserService } from "./user.service";

import { CreateUserLocalSchema } from "./service/create/local/schema";
import { LoginLocalSchema } from "./service/login/local/schema";
import { VerifyUserSchema } from "./service/verify/schema";

import { Routes } from "v1/config/routes";

@ApiTags("User")
@Controller(`${Routes.version}/user`)
export class UserController {
	public constructor(private UserService: UserService) {
		//
	}

	@Post(Routes.user.createLocal)
	public createLocal(data: CreateUserLocalSchema) {
		return this.UserService.createLocal(data);
	}

	@Post(Routes.user.loginLocal)
	public loginLocal(data: LoginLocalSchema) {
		return this.UserService.loginLocal(data);
	}

	@Put(Routes.user.regenPin)
	public regenPin(@Param("userId") userId: string) {
		return this.UserService.regenPin({
			userId,
		});
	}

	@HttpCode(204)
	@Put(Routes.user.verify)
	public verify(@Body() params: VerifyUserSchema) {
		return this.UserService.verify(params);
	}
}
