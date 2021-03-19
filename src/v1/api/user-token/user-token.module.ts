import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserTokenService } from "./user-token.service";

import { UserTokenController } from "./user-token.controller";

import { UserTokenEntity } from "./user-token.entity";

@Module({
	imports: [TypeOrmModule.forFeature([UserTokenEntity])],
	providers: [UserTokenService],
	controllers: [UserTokenController],
	exports: [UserTokenService],
})
export class UserTokenModule {
	//
}
