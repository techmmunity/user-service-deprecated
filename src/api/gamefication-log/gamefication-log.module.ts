import { Module } from "@nestjs/common";

import { GameficationLogService } from "./gamefication-log.service";

import { GameficationLogResolver } from "./gamefication-log.resolver";

@Module({
	providers: [GameficationLogService, GameficationLogResolver],
})
export class GameficationLogModule {
	//
}
