import { ApiProperty } from "@nestjs/swagger";

import { pinUtil } from "v1/utils/pin";

export class RegenPinOutputSchema {
	@ApiProperty({
		description: "New user PIN",
		example: pinUtil.gen(),
	})
	public newPin: string;
}
