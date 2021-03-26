import { ApiProperty } from "@nestjs/swagger";

export class VerifyAccountSchema {
	@ApiProperty({
		description: "User ID",
		example: "e5600754-9684-4649-bb19-ea47cffeb6aa",
	})
	public userId: string;

	@ApiProperty({
		description: "Verification Code",
		example: "547812",
	})
	public verificationCode: string;
}
