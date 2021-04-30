import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserService } from "./user.service";

import { UserController } from "./user.controller";

import { ConfirmationTokenEntity } from "../confirmation-token/confirmation-token.entity";
import { ContactEntity } from "../contact/contact.entity";
import { UserEntity } from "v1/api/user/user.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ConfirmationTokenEntity,
			ContactEntity,
			UserEntity,
		]),
	],
	providers: [UserService],
	controllers: [UserController],
	exports: [UserService],
})
export class UserModule {
	//
}
