import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ConfirmationTokenService } from "./confirmation-token.service";

import { ConfirmationTokenController } from "./confirmation-token.controller";

import { ConfirmationTokenEntity } from "./confirmation-token.entity";

@Module({
	imports: [TypeOrmModule.forFeature([ConfirmationTokenEntity])],
	controllers: [ConfirmationTokenController],
	providers: [ConfirmationTokenService],
})
export class ConfirmationTokenModule {}
