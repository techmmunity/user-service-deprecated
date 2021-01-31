import { Module } from "@nestjs/common";

import { Api } from "./api";

import { AppService } from "./app.service";

import { MongoDBConnect } from "config/mongodb";

@Module({
	imports: [MongoDBConnect, ...Api],
	providers: [AppService],
})
export class AppModule {
	//
}
