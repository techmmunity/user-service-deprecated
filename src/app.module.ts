import { Module } from "@nestjs/common";

import { Api } from "./api";

import { AppService } from "./app.service";

import { GraphQL } from "config/graphql";
import { MongoDBConnect } from "config/mongodb";
import { SettingsModule } from './api/settings/settings.module';
import { TutorialModule } from './api/tutorial/tutorial.module';
import { UserTokenModule } from './api/user-token/user-token.module';
import { VerifyAccountModule } from './api/verify-account/verify-account.module';

@Module({
	imports: [MongoDBConnect, GraphQL, ...Api, SettingsModule, TutorialModule, UserTokenModule, VerifyAccountModule],
	providers: [AppService],
})
export class AppModule {
	//
}
