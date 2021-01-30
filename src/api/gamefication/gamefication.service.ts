import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { addCardProgress, AddCardParams } from "./service/add-card-progress";
import { addReward, AddRewardParams } from "./service/add-reward";
import { create } from "./service/create";
import { findByUserId } from "./service/find-by-user-id";

import {
	GameficationEntity,
	GameficationRepository,
} from "./entities/gamefication.entity";

@Injectable()
export class GameficationService {
	public constructor(
		@InjectRepository(GameficationEntity)
		private readonly GameficationRepository: GameficationRepository,
	) {
		//
	}

	public create(userId: string) {
		return create({
			userId,
			GameficationRepository: this.GameficationRepository,
		});
	}

	public findByUserId(userId: string) {
		return findByUserId({
			userId,
			GameficationRepository: this.GameficationRepository,
		});
	}

	public addReward(params: AddRewardParams) {
		return addReward(params);
	}

	public addCardProgress(params: AddCardParams) {
		return addCardProgress(params);
	}
}
