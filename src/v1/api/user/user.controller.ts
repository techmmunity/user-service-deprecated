import { Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { UserService } from "./user.service";

import { CreateDiscordParams } from "./service/create/discord";
import { CreateLocalParams } from "./service/create/local";

import { Routes } from "v1/config/routes";

@ApiTags("User")
@Controller(`${Routes.version}/user`)
export class UserController {
	public constructor(private UserService: UserService) {
		//
	}

	@Post(Routes.user.createLocal)
	public createLocal(data: CreateLocalParams) {
		return this.UserService.createLocal(data);
	}

	@Post(Routes.user.createDiscord)
	public createDiscord(data: CreateDiscordParams) {
		return this.UserService.createDiscord(data);
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
