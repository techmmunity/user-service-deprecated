import { Module } from "@nestjs/common";

import { Api } from "./api";

import { PostgresConnect } from "v1/config/postgres";

@Module({
	imports: [PostgresConnect, ...Api],
})
export class V1Module {
	//
}
