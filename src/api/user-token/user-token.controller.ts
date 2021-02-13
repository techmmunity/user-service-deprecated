import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { UserTokenService } from "./user-token.service";

import { UpdateTokenParams } from "./service/update";

import { MessagePatterns } from "config/message-patterns";

@Controller()
export class UserTokenController {
	public constructor(private UserTokenService: UserTokenService) {
		//
	}

	@MessagePattern(MessagePatterns.userToken.update)
	public update(params: UpdateTokenParams) {
		return this.UserTokenService.update(params);
	}
}
