import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { create, CreateParams } from "./service/create";

import { SettingsEntity, SettingsRepository } from "./settings.entity";

@Injectable()
export class SettingsService {
	public constructor(
		@InjectRepository(SettingsEntity)
		private readonly SettingsRepository: SettingsRepository,
	) {
		//
	}

	public create(params: CreateParams) {
		return create({
			SettingsRepository: this.SettingsRepository,
			...params,
		});
	}
}
