import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";

const { NODE_ENV } = process.env;

const IsDevOrHmg = ["dev", "homolog"].includes(NODE_ENV);

export const GraphQL = GraphQLModule.forRoot({
	autoSchemaFile: join(process.cwd(), "src/schemas.gql"),
	debug: IsDevOrHmg,
	playground: IsDevOrHmg,
	context: ({ req }) => ({ headers: req.headers }),
});
