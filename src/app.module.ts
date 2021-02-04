import { Module } from "@nestjs/common";

import { Api } from "./api";

import { MongoDBConnect } from "config/mongodb";

@Module({
	imports: [MongoDBConnect, ...Api],
})
export class AppModule {
	//
}
