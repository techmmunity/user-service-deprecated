import { ApiProperty } from "@nestjs/swagger";
import { v4 } from "uuid";

import { ContactTypeEnum, ContactTypeValues } from "core/enums/contact-type";

export class FindUserOutputSchema {
	@ApiProperty({
		description: "User ID",
		example: v4(),
	})
	public userId: string;

	@ApiProperty({
		description: "User username",
		example: "foo_bar",
	})
	public username: string;

	@ApiProperty({
		description: "User primary contact value",
		example: "foo@bar.com",
	})
	public primaryContact: string;

	@ApiProperty({
		description: "User primary contact type",
		enum: ContactTypeValues(),
		type: "enum",
	})
	public primaryContactType: ContactTypeEnum;
}
