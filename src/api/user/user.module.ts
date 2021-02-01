import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserService } from "./user.service";

import { SettingsModule } from "api/settings/settings.module";
import { TutorialModule } from "api/tutorial/tutorial.module";
import { UserTokenModule } from "api/user-token/user-token.module";

import { UserController } from "./user.controller";

import { UserEntity } from "api/user/user.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
		SettingsModule,
		TutorialModule,
		UserTokenModule,
	],
	providers: [UserService, SettingsModule, TutorialModule, UserTokenModule],
	controllers: [UserController],
})
export class UserModule {
	//
}
