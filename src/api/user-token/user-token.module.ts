import { Module } from "@nestjs/common";

import { UserTokenService } from "./user-token.service";

import { UserTokenResolver } from "./user-token.resolver";

@Module({
	providers: [UserTokenService, UserTokenResolver],
})
export class UserTokenModule {
	//
}
