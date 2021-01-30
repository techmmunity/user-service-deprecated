import { Module } from "@nestjs/common";

import { UserInterestsService } from "./user-interests.service";

import { UserInterestsResolver } from "./user-interests.resolver";

@Module({
	providers: [UserInterestsService, UserInterestsResolver],
})
export class UserInterestsModule {
	//
}
