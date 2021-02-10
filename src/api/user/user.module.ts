import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserService } from "./user.service";

import { SettingsModule } from "api/settings/settings.module";
import { TutorialModule } from "api/tutorial/tutorial.module";
import { UserTokenModule } from "api/user-token/user-token.module";
import { VerifyAccountModule } from "api/verify-account/verify-account.module";

import { UserController } from "./user.controller";

import { UserEntity } from "api/user/user.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
		SettingsModule,
		TutorialModule,
		UserTokenModule,
		forwardRef(() => VerifyAccountModule),
	],
	providers: [UserService, SettingsModule, TutorialModule, UserTokenModule],
	controllers: [UserController],
	exports: [UserService],
})
export class UserModule {
	//
}
