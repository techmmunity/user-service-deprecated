import { addCard } from "./helpers/add-card";
import { getGamefication } from "./helpers/get-gamefication";
import { updateCard } from "./helpers/update-card";

import { typeValidation } from "./validation/type-validation";

import { CardRepository } from "api/card/card.entity";
import { GameficationRepository } from "api/gamefication/gamefication.entity";

import { ErrorUtil } from "utils/error";

import { Token } from "types/token";

export interface AddCardParams {
	CardRepository: CardRepository;
	GameficationRepository: GameficationRepository;
	user: Token;
	cardCode: string;
}

export const addCardProgress = async ({
	CardRepository,
	GameficationRepository,
	user,
	cardCode,
}: AddCardParams) => {
	typeValidation(cardCode);

	const gamefication = await getGamefication({
		GameficationRepository,
		user,
	});

	const userCard = gamefication.cards.find(card => card.cardCode === cardCode);

	if (!userCard.necessaryToAchieve) {
		ErrorUtil.conflict("USER_ALREADY_HAS_CARD");
	}

	if (userCard) {
		return updateCard({
			GameficationRepository,
			user,
			card: userCard,
			currentCards: gamefication.cards,
		});
	}

	return addCard({
		GameficationRepository,
		CardRepository,
		user,
		cardCode,
		currentCards: gamefication.cards,
	});
};
