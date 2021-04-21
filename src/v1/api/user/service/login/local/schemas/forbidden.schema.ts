import { ApiProperty } from "@nestjs/swagger";

export class LoginLocalForbiddenSchema {
	@ApiProperty({
		description: "Errors",
		example: ["Account unverified"],
	})
	public errors: Array<string>;
}
