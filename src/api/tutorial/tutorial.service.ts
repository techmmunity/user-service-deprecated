import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { complete, CompleteParams } from "./service/complete";
import { create, CreateParams } from "./service/create";

import { TutorialEntity, TutorialRepository } from "./tutorial.entity";

@Injectable()
export class TutorialService {
	public constructor(
		@InjectRepository(TutorialEntity)
		private readonly TutorialRepository: TutorialRepository,
	) {
		//
	}

	public create(params: CreateParams) {
		return create({
			TutorialRepository: this.TutorialRepository,
			...params,
		});
	}

	public complete(params: CompleteParams) {
		return complete({
			TutorialRepository: this.TutorialRepository,
			...params,
		});
	}
}
