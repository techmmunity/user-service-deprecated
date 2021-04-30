import { ApiProperty } from "@nestjs/swagger";

export class VerifyConfirmationTokenNotFoundSchema {
	@ApiProperty({
		description: "Errors",
		example: ["Invalid userId or verificationCode"],
	})
	public errors: Array<string>;
}
