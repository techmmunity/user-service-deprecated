import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Swagger } from "swagger";
import {
	initializeTransactionalContext,
	patchTypeORMRepositoryWithBaseRepository,
} from "typeorm-transactional-cls-hooked";

import { AppModule } from "./app.module";

const { PORT } = process.env;

async function server() {
	initializeTransactionalContext();
	patchTypeORMRepositoryWithBaseRepository();

	const logger = new Logger("Main");

	const app = await NestFactory.create(AppModule);

	Swagger(app);

	app.listen(PORT, () => logger.log("Server Ready"));
}

server();
