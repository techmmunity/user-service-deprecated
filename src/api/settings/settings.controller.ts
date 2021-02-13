import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { SettingsService } from "./settings.service";

import { UpdateParams } from "./service/update";

import { MessagePatterns } from "config/message-patterns";

@Controller()
export class SettingsController {
	public constructor(private SettingsService: SettingsService) {
		//
	}

	@MessagePattern(MessagePatterns.settings.update)
	public complete(data: UpdateParams) {
		return this.SettingsService.update(data);
	}
}
