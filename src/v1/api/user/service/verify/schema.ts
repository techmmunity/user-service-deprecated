import { ApiProperty } from "@nestjs/swagger";

import { PinUtil } from "v1/utils/pin";

export class VerifyUserSchema {
	@ApiProperty({
		description: "User ID",
		example: "3773291c-3f30-46b7-b230-8180b5d8bf6d",
	})
	public userId: string;

	@ApiProperty({
		description: "Verification code",
		example: PinUtil.gen(),
	})
	public verificationCode: string;
}
