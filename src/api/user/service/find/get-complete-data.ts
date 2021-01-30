import { GameficationService } from "api/gamefication/gamefication.service";

import { SettingRepository } from "api/user/entities/setting.entity";
import { TutorialRepository } from "api/user/entities/tutorial.entity";
import { UserFindOne, UserRepository } from "api/user/entities/user.entity";

interface Params {
	TutorialRepository: TutorialRepository;
	SettingRepository: SettingRepository;
	UserRepository: UserRepository;
	GameficationService: GameficationService;
	query: UserFindOne;
}

export const getCompleteData = async ({
	TutorialRepository,
	SettingRepository,
	UserRepository,
	GameficationService,
	query,
}: Params) => {
	const user = await UserRepository.findOne(query);

	if (!user) {
		return;
	}

	const userId = user._id.toHexString();

	const queryToRelatedItems = {
		where: {
			userId,
		},
	};

	const [tutorial, settings, gamefication] = await Promise.all([
		TutorialRepository.findOne(queryToRelatedItems),
		SettingRepository.findOne(queryToRelatedItems),
		GameficationService.findByUserId(userId),
	]);

	return {
		user,
		tutorial,
		settings,
		gamefication,
	};
};
