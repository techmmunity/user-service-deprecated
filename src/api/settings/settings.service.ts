import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transactional } from "typeorm-transactional-cls-hooked";

import { create, CreateParams } from "./service/create";
import { update, UpdateParams } from "./service/update";

import { SettingsEntity, SettingsRepository } from "./settings.entity";

@Injectable()
export class SettingsService {
	public constructor(
		@InjectRepository(SettingsEntity)
		private readonly SettingsRepository: SettingsRepository,
	) {
		//
	}

	@Transactional()
	public create(params: CreateParams) {
		return create({
			SettingsRepository: this.SettingsRepository,
			...params,
		});
	}

	@Transactional()
	public update(params: UpdateParams) {
		return update({
			SettingsRepository: this.SettingsRepository,
			...params,
		});
	}
}
