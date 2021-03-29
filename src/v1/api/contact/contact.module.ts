import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ContactService } from "./contact.service";

import { ContactController } from "./contact.controller";

import { ContactEntity } from "./contact.entity";

@Module({
	imports: [TypeOrmModule.forFeature([ContactEntity])],
	controllers: [ContactController],
	providers: [ContactService],
})
export class ContactModule {
	//
}
