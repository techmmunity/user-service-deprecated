import { Module } from "@nestjs/common";

import { HeadlineService } from "./headline.service";

import { HeadlineController } from "./headline.controller";

@Module({
	providers: [HeadlineService],
	controllers: [HeadlineController],
})
export class HeadlineModule {
	//
}
