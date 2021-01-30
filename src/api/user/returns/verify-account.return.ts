import { ObjectType } from "@nestjs/graphql";

@ObjectType()
export class VerifyAccountReturn {
	public readonly ok: boolean;
}
