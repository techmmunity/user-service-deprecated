import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

const { PORT } = process.env;

async function server() {
	const app = await NestFactory.create(AppModule);

	await app.listen(PORT);
}

server();
