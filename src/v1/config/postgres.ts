import { TypeOrmModule } from "@nestjs/typeorm";

const {
	NODE_ENV,
	POSTGRES_HOST,
	POSTGRES_PASSWORD,
	POSTGRES_DATABSE,
	POSTGRES_USER,
} = process.env;

export const POSTGRES_CONNECT = TypeOrmModule.forRoot({
	type: "postgres",
	host: POSTGRES_HOST,
	username: POSTGRES_USER,
	database: POSTGRES_DATABSE,
	password: POSTGRES_PASSWORD,
	synchronize: false,
	logging: NODE_ENV !== "production",
	migrationsRun: true,
	entities: ["dist/v1/api/**/*.entity.js"],
	migrations: ["dist/v1/migrations/*.js"],
});
