import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { create } from "./service/create";
import { CreateUser } from "./service/create/types";
import { findBy } from "./service/find/find-by";
import { findOneBy } from "./service/find/find-one-by";

import { SettingEntity, SettingRepository } from "api/settings/setting.entity";
import {
	TutorialEntity,
	TutorialRepository,
} from "api/tutorial/tutorial.entity";
import {
	UserFindMany,
	UserFindOne,
	UserEntity,
	UserRepository,
} from "api/user/user.entity";

@Injectable()
export class UserService {
	public constructor(
		@InjectRepository(SettingEntity)
		private readonly SettingRepository: SettingRepository,
		@InjectRepository(TutorialEntity)
		private readonly TutorialRepository: TutorialRepository,
		@InjectRepository(UserEntity)
		private readonly UserRepository: UserRepository,
	) {
		//
	}

	private get repositories() {
		return {
			SettingRepository: this.SettingRepository,
			TutorialRepository: this.TutorialRepository,
			UserRepository: this.UserRepository,
		};
	}

	/**
	 *
	 * User
	 *
	 */

	public create(params: CreateUser) {
		return create({
			...params,
			...this.repositories,
		});
	}

	public findBy(options?: UserFindMany) {
		return findBy({
			options,
			...this.repositories,
		});
	}

	public findOneBy(options?: UserFindOne) {
		return findOneBy({
			options,
			...this.repositories,
		});
	}
}
