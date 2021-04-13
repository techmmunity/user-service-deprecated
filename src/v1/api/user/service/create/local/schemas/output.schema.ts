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
		description: "Verification Code",
		example: PinUtil.gen(),
	})
	public verificationCode: string;
}
