import { TypeOrmModule } from "@nestjs/typeorm";

const {
	POSTGRES_HOST,
	POSTGRES_PASSWORD,
	POSTGRES_DATABSE,
	POSTGRES_USER,
} = process.env;

export const PostgresConnect = TypeOrmModule.forRoot({
	type: "postgres",
	host: POSTGRES_HOST,
	username: POSTGRES_USER,
	database: POSTGRES_DATABSE,
	password: POSTGRES_PASSWORD,
	synchronize: false,
	logging: true,
	migrationsRun: true,
	entities: ["dist/v1/api/**/*.entity.js"],
	migrations: ["dist/v1/migrations/*.js"],
});
