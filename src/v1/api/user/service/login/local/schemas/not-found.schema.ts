import { ApiProperty } from "@nestjs/swagger";

export class LoginLocalNotFoundSchema {
	@ApiProperty({
		description: "Errors",
		example: ["User not found"],
	})
	public errors: Array<string>;
}
