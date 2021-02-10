import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { UserService } from "./user.service";

import { CreateDiscordParams } from "./service/create/discord";
import { CreateLocalParams } from "./service/create/local";

import { MessagePatterns } from "config/message-patterns";

@Controller()
export class UserController {
	public constructor(private UserService: UserService) {
		//
	}

	@MessagePattern(MessagePatterns.user.createLocal)
	public createLocal(data: CreateLocalParams) {
		return this.UserService.createLocal(data);
	}

	@MessagePattern(MessagePatterns.user.createDiscord)
	public createDiscord(data: CreateDiscordParams) {
		return this.UserService.createDiscord(data);
	}
}
