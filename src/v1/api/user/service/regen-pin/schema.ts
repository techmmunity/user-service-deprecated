import { ApiProperty } from "@nestjs/swagger";

export class RegenUserPINSchema {
	@ApiProperty({
		description: "User ID",
		example: "3773291c-3f30-46b7-b230-8180b5d8bf6d",
	})
	public userId: string;
}
