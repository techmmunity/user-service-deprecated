import { Controller, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { SettingsService } from "./settings.service";

import { UpdateParams } from "./service/update";

import { Routes } from "v1/config/routes";

@ApiTags("Settings")
@Controller(`${Routes.version}/settings`)
export class SettingsController {
	public constructor(private SettingsService: SettingsService) {
		//
	}

	@Put(Routes.settings.update)
	public complete(data: UpdateParams) {
		return this.SettingsService.update(data);
	}
}
