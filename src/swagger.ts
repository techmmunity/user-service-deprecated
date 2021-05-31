import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

export const setSwagger = (app: INestApplication) => {
	const config = new DocumentBuilder()
		.setTitle("User Service")
		.setDescription("")
		.setVersion("1.0")
		.build();

	const document = SwaggerModule.createDocument(app, config);

	SwaggerModule.setup("swagger", app, document);
};
