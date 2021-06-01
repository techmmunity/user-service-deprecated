import { Body, Controller, Post } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiTags,
} from "@nestjs/swagger";

import { DiscordService } from "./discord.service";

import { CreateOrLoginBadRequestSchema } from "./service/create-or-login/schemas/bad-request.schema";
import { CreateOrLoginConflictSchema } from "./service/create-or-login/schemas/conflict.schema";
import { CreateOrLoginInputSchema } from "./service/create-or-login/schemas/input.schema";
import { CreateOrLoginOutputSchema } from "./service/create-or-login/schemas/output.schema";

import { CONFIG } from "v1/config";

@ApiTags(`${CONFIG.version} - Discord`, `${CONFIG.version} - User`)
@Controller(`${CONFIG.version}/discord`)
export class DiscordController {
	public constructor(private readonly discordService: DiscordService) {}

	@Post()
	@ApiCreatedResponse({
		type: CreateOrLoginOutputSchema,
	})
	@ApiBadRequestResponse({
		type: CreateOrLoginBadRequestSchema,
	})
	@ApiConflictResponse({
		type: CreateOrLoginConflictSchema,
	})
	public createOrLogin(@Body() data: CreateOrLoginInputSchema) {
		return this.discordService.createOrLogin(data);
	}
}
