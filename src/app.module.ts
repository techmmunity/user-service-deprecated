import { Module } from "@nestjs/common";

import { Api } from "./api";

import { AppService } from "./app.service";

import { GraphQL } from "config/graphql";
import { MongoDBConnect } from "config/mongodb";

@Module({
	imports: [MongoDBConnect, GraphQL, ...Api],
	providers: [AppService],
})
export class AppModule {
	//
}
