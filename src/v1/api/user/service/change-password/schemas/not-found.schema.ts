import { ApiProperty } from "@nestjs/swagger";

export class ChangePasswordNotFoundSchema {
	@ApiProperty({
		description: "Errors",
		example: ["Confirmation token not found", "User not found"],
	})
	public errors: Array<string>;
}
