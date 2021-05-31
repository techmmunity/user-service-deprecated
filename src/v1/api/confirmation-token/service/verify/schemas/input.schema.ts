import { ApiProperty } from "@nestjs/swagger";
import { v4 } from "uuid";

import { pinUtil } from "v1/utils/pin";

export class VerifyConfirmationTokenInputSchema {
	@ApiProperty({
		description: "Contact ID",
		example: v4(),
	})
	public contactId: string;

	@ApiProperty({
		description: "Verification code",
		example: pinUtil.gen(6),
	})
	public verificationCode: string;
}
