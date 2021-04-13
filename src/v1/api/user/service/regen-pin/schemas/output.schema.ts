import { ApiProperty } from "@nestjs/swagger";

import { PinUtil } from "v1/utils/pin";

export class RegenPinOutputSchema {
	@ApiProperty({
		description: "New user PIN",
		example: PinUtil.gen(),
	})
	public newPin: string;
}
