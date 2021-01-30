import { TypeOrmModuleOptions, TypeOrmModule } from "@nestjs/typeorm";

const { NODE_ENV, MONGO_USER, MONGO_PASSWORD, MONGO_DB } = process.env;

const getEntitiesDir = () => ["dist/api/**/*.entity.js"];

const getConfig = (): TypeOrmModuleOptions => {
	switch (NODE_ENV) {
		case "production":
		case "homolog":
			return {
				type: "mongodb",
				url: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.uf3jn.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`,
				useNewUrlParser: true,
				useUnifiedTopology: true,
				synchronize: false,
				logging: true,
				entities: getEntitiesDir(),
			};
		case "test":
			return {};
		case "dev":
		default:
			return {
				type: "mongodb",
				host: "mongodb",
				username: MONGO_USER,
				database: MONGO_DB,
				port: 27017,
				useNewUrlParser: true,
				useUnifiedTopology: true,
				synchronize: true,
				logging: true,
				entities: getEntitiesDir(),
			};
	}
};

export const MongoDBConnect = TypeOrmModule.forRoot(getConfig());
