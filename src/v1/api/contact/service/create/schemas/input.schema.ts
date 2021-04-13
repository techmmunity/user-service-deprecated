import { ApiProperty } from "@nestjs/swagger";
import { v4 } from "uuid";

import { ContactTypeEnum, ContactTypeValues } from "core/enums/contact-type";

class ContactInput {
	@ApiProperty({
		description: "Contact type",
		enum: ContactTypeValues(),
	})
	public type: ContactTypeEnum;

	@ApiProperty({
		description: "Contact value",
		example: "foobar@foo.com",
	})
	public value: string;
}

export class CreateContactInputSchema {
	@ApiProperty({
		description: "User ID",
		example: v4(),
	})
	public userId: string;

	@ApiProperty({
		description: "User contacts to add",
		isArray: true,
		type: ContactInput,
	})
	public contacts: Array<ContactInput>;
}
