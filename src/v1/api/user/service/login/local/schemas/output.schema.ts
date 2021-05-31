import { ApiProperty } from "@nestjs/swagger";
import { v4 } from "uuid";

import { pinUtil } from "v1/utils/pin";

export class LoginLocalOutputSchema {
	@ApiProperty({
		description: "User ID",
		example: v4(),
	})
	public userId: string;

	@ApiProperty({
		description: "User PIN",
		example: pinUtil.gen(),
	})
	public pin: string;
}
