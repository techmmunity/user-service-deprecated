import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { GameficationService } from "./gamefication.service";

import { GameficationEntity } from "./gamefication.entity";

const Repositories = TypeOrmModule.forFeature([GameficationEntity]);

@Module({
	imports: [Repositories],
	providers: [GameficationService],
	exports: [GameficationService, Repositories],
})
export class GameficationModule {
	//
}
