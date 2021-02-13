import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { TutorialService } from "./tutorial.service";

import { CompleteParams } from "./service/complete";

import { MessagePatterns } from "config/message-patterns";

@Controller()
export class TutorialController {
	public constructor(private TutorialService: TutorialService) {
		//
	}

	@MessagePattern(MessagePatterns.tutorial.complete)
	public complete(data: CompleteParams) {
		return this.TutorialService.complete(data);
	}
}
