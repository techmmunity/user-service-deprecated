import { ApiProperty } from "@nestjs/swagger";

export class ChangePasswordOutputSchema {
	@ApiProperty({
		description: "User ID",
		example: "5076ca07-57f3-4148-a519-537e8b897a90",
	})
	public userId: string;
}
