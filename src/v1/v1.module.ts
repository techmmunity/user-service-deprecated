import { Module } from "@nestjs/common";

import { API } from "./api";

import { POSTGRES_CONNECT } from "v1/config/postgres";

@Module({
	imports: [POSTGRES_CONNECT, ...API],
})
export class V1Module {}
