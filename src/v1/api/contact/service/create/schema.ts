import { ApiProperty } from "@nestjs/swagger";

import { ContactTypeEnum, ContactTypeValues } from "core/enums/contact-type";

class Contact {
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

	@ApiProperty({
		description:
			"Flag that determines if is a primary contact (only 1 for each type)",
	})
	public primary?: boolean;
}

export class CreateContactSchema {
	@ApiProperty({
		description: "User ID",
		example: "e5600754-9684-4649-bb19-ea47cffeb6aa",
	})
	public userId: string;

	@ApiProperty({
		description: "User contacts to add",
		isArray: true,
		type: Contact,
	})
	public contacts: Array<Contact>;
}
