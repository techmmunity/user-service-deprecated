import { ApiProperty } from "@nestjs/swagger";
import { v4 } from "uuid";

import { pinUtil } from "v1/utils/pin";

export class CreateUserLocalOutputSchema {
	@ApiProperty({
		description: "User username",
		example: "foo_bar",
	})
	public username: string;

	@ApiProperty({
		description: "User email",
		example: "foo@bar.com",
	})
	public email: string;

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
		example: pinUtil.gen(6),
	})
	public verificationCode: string;
}
