import { Controller, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { TutorialService } from "./tutorial.service";

import { CompleteParams } from "./service/complete";

import { Routes } from "v1/config/routes";

@ApiTags("Tutorial")
@Controller(`${Routes.version}/tutorial`)
export class TutorialController {
	public constructor(private TutorialService: TutorialService) {
		//
	}

	@Put(Routes.tutorial.complete)
	public complete(data: CompleteParams) {
		return this.TutorialService.complete(data);
	}
}
