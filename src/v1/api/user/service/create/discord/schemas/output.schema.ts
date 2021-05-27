import { ApiProperty } from "@nestjs/swagger";
import { v4 } from "uuid";

import { PinUtil } from "v1/utils/pin";

export class CreateUserDiscordOutputSchema {
	@ApiProperty({
		description: "User ID",
		example: v4(),
	})
	public userId: string;

	@ApiProperty({
		description: "User PIN",
		example: PinUtil.gen(),
	})
	public pin: string;
}
