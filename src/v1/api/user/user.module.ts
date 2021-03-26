import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserService } from "./user.service";

import { ContactModule } from "../contact/contact.module";

import { UserController } from "./user.controller";

import { UserEntity } from "v1/api/user/user.entity";

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity]), ContactModule],
	providers: [UserService],
	controllers: [UserController],
	exports: [UserService],
})
export class UserModule {
	//
}
