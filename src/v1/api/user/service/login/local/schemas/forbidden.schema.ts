import { ApiProperty } from "@nestjs/swagger";

export class LoginLocalForbiddenSchema {
	@ApiProperty({
		description: "Errors",
		example: ["Contact unverified"],
	})
	public errors: Array<string>;
}
