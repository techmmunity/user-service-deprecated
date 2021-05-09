import { ApiProperty } from "@nestjs/swagger";
import { v4 } from "uuid";

import {
	ConfirmationTokenTypeEnum,
	ConfirmationTokenTypeValues,
} from "core/enums/confirmation-token-type";

export class CreateConfirmationTokenOutputSchema {
	@ApiProperty({
		description: "Confirmation Token ID",
		example: v4(),
	})
	public id?: string;

	@ApiProperty({
		description: "User ID",
		example: v4(),
	})
	public userId: string;

	@ApiProperty({
		description: "Contact ID",
		example: v4(),
	})
	public contactId: string;

	@ApiProperty({
		description: "Confirmation token type",
		type: "enum",
		enum: ConfirmationTokenTypeValues(),
	})
	public type: ConfirmationTokenTypeEnum;

	@ApiProperty({
		description: "Date that the confirmation token was used",
		example: new Date(),
	})
	public usedAt: Date;

	@ApiProperty({
		description: "Date that the confirmation token was created",
		example: new Date(),
	})
	public createdAt: Date;
}
