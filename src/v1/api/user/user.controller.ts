import { Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { UserService } from "./user.service";

import { CreateParams } from "./service/create";

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

	@Get(Routes.user.findById)
	public findById(@Param("id") userId: string) {
		return this.UserService.findById({
			userId,
		});
	}

	@Put(Routes.user.regenPin)
	public regenPin(@Param("id") userId: string) {
		return this.UserService.regenPin({
			userId,
		});
	}
}
