import { ApiProperty } from "@nestjs/swagger";
import { v4 } from "uuid";

import { PinUtil } from "v1/utils/pin";

export class VerifyUserInputSchema {
	@ApiProperty({
		description: "User ID",
		example: v4(),
	})
	public userId: string;

	@ApiProperty({
		description: "Verification code",
		example: PinUtil.gen(),
	})
	public verificationCode: string;
}
