import { ApiProperty } from "@nestjs/swagger";
import { v4 } from "uuid";

import { ContactTypeEnum, ContactTypeValues } from "core/enums/contact-type";

export class CreateContactOutputSchema {
	@ApiProperty({
		description: "Contact ID",
		example: v4(),
	})
	public id: string;

	@ApiProperty({
		description: "User ID",
		example: v4(),
	})
	public userId: string;

	@ApiProperty({
		description: "Contact type",
		enum: ContactTypeValues(),
	})
	public type: ContactTypeEnum;

	@ApiProperty({
		description: "Flag to tell if it's a primary contact type",
	})
	public primary: boolean;

	@ApiProperty({
		description: "Contact value",
		example: "foobar@foo.com",
	})
	public value: string;

	@ApiProperty({
		description: "Creation date of contact",
		example: new Date(),
	})
	public createdAt: string;

	@ApiProperty({
		description: "Update date of contact",
		example: new Date(),
	})
	public updatedAt: string;
}
