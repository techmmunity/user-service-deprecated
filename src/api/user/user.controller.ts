import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { UserService } from "./user.service";

import { CreateDiscordParams } from "./service/create/discord";
import { CreateLocalParams } from "./service/create/local";

@Controller()
export class UserController {
	public constructor(private UserService: UserService) {
		//
	}

	@MessagePattern("create-local")
	public createLocal(data: CreateLocalParams) {
		return this.UserService.createLocal(data);
	}

	@MessagePattern("create-discord")
	public createDiscord(data: CreateDiscordParams) {
		return this.UserService.createDiscord(data);
	}
}
