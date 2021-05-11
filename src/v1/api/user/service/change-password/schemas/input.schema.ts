import { ApiProperty } from "@nestjs/swagger";

export class ChangePasswordInputSchema {
	@ApiProperty({
		description: "Confirmation token ID",
		example: "3cdec3a0-2260-4708-ace1-225f72871427",
	})
	public confirmationTokenId: string;

	@ApiProperty({
		description: "User new password",
		example: "t6@CKCR",
	})
	public newPassword: string;
}
