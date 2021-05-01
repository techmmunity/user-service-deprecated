import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ContactService } from "./contact.service";

import { ContactController } from "./contact.controller";

import { ConfirmationTokenEntity } from "../confirmation-token/confirmation-token.entity";
import { ContactEntity } from "./contact.entity";

@Module({
	imports: [TypeOrmModule.forFeature([ConfirmationTokenEntity, ContactEntity])],
	controllers: [ContactController],
	providers: [ContactService],
})
export class ContactModule {
	//
}
