import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transactional } from "typeorm-transactional-cls-hooked";

import { createOrLogin, CreateOrLoginParams } from "./service/create-or-login";

import {
	ConfirmationTokenEntity,
	ConfirmationTokenRepository,
} from "../confirmation-token/confirmation-token.entity";
import { DiscordEntity, DiscordRepository } from "./discord.entity";

@Injectable()
export class DiscordService {
	public constructor(
		@InjectRepository(DiscordEntity)
		private readonly discordRepository: DiscordRepository,
		@InjectRepository(ConfirmationTokenEntity)
		private readonly confirmationTokenRepository: ConfirmationTokenRepository,
	) {}

	@Transactional()
	public createOrLogin(params: CreateOrLoginParams) {
		return createOrLogin(
			{
				discordRepository: this.discordRepository,
				confirmationTokenRepository: this.confirmationTokenRepository,
			},
			params,
		);
	}
}
