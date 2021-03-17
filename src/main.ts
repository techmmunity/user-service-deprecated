import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
	initializeTransactionalContext,
	patchTypeORMRepositoryWithBaseRepository,
} from "typeorm-transactional-cls-hooked";

import { MicroserviceOptions } from "./config/microservice";

import { AppModule } from "./app.module";

async function server() {
	initializeTransactionalContext();
	patchTypeORMRepositoryWithBaseRepository();

	const logger = new Logger("Main");

	const app = await NestFactory.createMicroservice(
		AppModule,
		MicroserviceOptions,
	);

	app.listen(() => logger.log("Server Ready"));
}

server();
