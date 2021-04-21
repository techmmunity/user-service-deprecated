import { ApiProperty } from "@nestjs/swagger";
import { v4 } from "uuid";

export class RegenPinNotFoundSchema {
	@ApiProperty({
		description: "Errors",
		example: [`User with ID "${v4()}" doesn't exist`],
	})
	public errors: Array<string>;
}
