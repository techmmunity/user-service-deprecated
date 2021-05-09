import { ApiProperty } from "@nestjs/swagger";
import { v4 } from "uuid";

import {
	ConfirmationTokenTypeEnum,
	ConfirmationTokenTypeValues,
} from "core/enums/confirmation-token-type";

export class CreateConfirmationTokenInputSchema {
	@ApiProperty({
		description: "User ID",
		example: v4(),
	})
	public userId?: string;

	@ApiProperty({
		description: "Contact ID",
		example: v4(),
	})
	public contactId?: string;

	@ApiProperty({
		description: "Confirmation token type",
		type: "enum",
		enum: ConfirmationTokenTypeValues(),
	})
	public type: ConfirmationTokenTypeEnum;
}
