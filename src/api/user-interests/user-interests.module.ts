import { Module } from "@nestjs/common";

import { UserInterestsService } from "./user-interests.service";

import { UserInterestsController } from "./user-interests.controller";

@Module({
	providers: [UserInterestsService],
	controllers: [UserInterestsController],
})
export class UserInterestsModule {
	//
}
