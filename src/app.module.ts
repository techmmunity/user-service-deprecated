import { Module } from "@nestjs/common";

import { Api } from "./api";

import { PostgresConnect } from "config/postgres";

@Module({
	imports: [PostgresConnect, ...Api],
})
export class AppModule {
	//
}
