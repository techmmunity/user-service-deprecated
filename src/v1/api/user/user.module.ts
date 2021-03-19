import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserService } from "./user.service";

import { UserTokenModule } from "v1/api/user-token/user-token.module";
import { VerifyAccountModule } from "v1/api/verify-account/verify-account.module";

import { UserController } from "./user.controller";

import { UserEntity } from "v1/api/user/user.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([UserEntity]),
		UserTokenModule,
		forwardRef(() => VerifyAccountModule),
	],
	providers: [UserService, UserTokenModule],
	controllers: [UserController],
	exports: [UserService],
})
export class UserModule {
	//
}
