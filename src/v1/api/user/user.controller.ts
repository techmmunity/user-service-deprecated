import { Body, Controller, HttpCode, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { UserService } from "./user.service";

import { CreateParams } from "./service/create/local";
import { VerifyUserSchema } from "./service/verify/schema";

import { Routes } from "v1/config/routes";

@ApiTags("User")
@Controller(`${Routes.version}/user`)
export class UserController {
	public constructor(private UserService: UserService) {
		//
	}

	@Post(Routes.user.create)
	public create(data: CreateParams) {
		return this.UserService.create(data);
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
