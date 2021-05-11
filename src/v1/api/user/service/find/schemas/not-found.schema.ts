import { ApiProperty } from "@nestjs/swagger";

export class FindUserNotFoundSchema {
	@ApiProperty({
		description: "Errors",
		example: ["User not found"],
	})
	public errors: Array<string>;
}
