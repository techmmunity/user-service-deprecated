import { Transport, TcpOptions } from "@nestjs/microservices";

const { HOST, PORT } = process.env;

export const MicroserviceOptions: TcpOptions = {
	transport: Transport.TCP,
	options: {
		host: HOST,
		port: parseInt(PORT),
	},
};
