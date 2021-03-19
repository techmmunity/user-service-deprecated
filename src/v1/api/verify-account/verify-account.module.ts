import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { VerifyAccountService } from "./verify-account.service";

import { UserModule } from "v1/api/user/user.module";

import { VerifyAccountController } from "./verify-account.controller";

import { VerifyAccountEntity } from "./verify-account.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([VerifyAccountEntity]),
		forwardRef(() => UserModule),
	],
	providers: [VerifyAccountService],
	controllers: [VerifyAccountController],
	exports: [VerifyAccountService],
})
export class VerifyAccountModule {
	//
}
