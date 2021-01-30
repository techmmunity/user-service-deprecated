import { Module } from "@nestjs/common";

import { CardService } from "./card.service";

import { CardResolver } from "./card.resolver";

@Module({
	providers: [CardService, CardResolver],
})
export class CardModule {
	//
}
