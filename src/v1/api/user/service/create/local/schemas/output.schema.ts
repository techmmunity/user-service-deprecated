import { ApiProperty } from "@nestjs/swagger";
import { v4 } from "uuid";

import { PinUtil } from "v1/utils/pin";

export class CreateUserLocalOutputSchema {
	@ApiProperty({
		description: "User ID",
		example: v4(),
	})
	public userId: string;

	@ApiProperty({
		description: "Contact to verify ID",
		example: v4(),
	})
	public contactId: string;

	@ApiProperty({
		description: "Verification Code",
		example: PinUtil.gen(6),
	})
	public verificationCode: string;
}
