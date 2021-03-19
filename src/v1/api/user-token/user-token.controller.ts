import { Controller, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { UserTokenService } from "./user-token.service";

import { UpdateTokenParams } from "./service/update";

import { Routes } from "v1/config/routes";

@ApiTags("User Token")
@Controller(`${Routes.version}/user-token`)
export class UserTokenController {
	public constructor(private UserTokenService: UserTokenService) {
		//
	}

	@Put(Routes.userToken.update)
	public update(params: UpdateTokenParams) {
		return this.UserTokenService.update(params);
	}
}
