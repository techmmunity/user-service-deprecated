import { InputType } from "@nestjs/graphql";

@InputType()
export class GetProfileInput {
	public readonly username: string;
}
