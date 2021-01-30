import { Module } from "@nestjs/common";

import { HeadlineService } from "./headline.service";

import { HeadlineResolver } from "./headline.resolver";

@Module({
	providers: [HeadlineService, HeadlineResolver],
})
export class HeadlineModule {
	//
}
