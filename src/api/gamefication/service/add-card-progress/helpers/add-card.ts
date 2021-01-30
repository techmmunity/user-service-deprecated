import {
	CardEntity,
	CardRepository,
} from "api/gamefication/entities/card.entity";
import {
	CardUser,
	GameficationRepository,
} from "api/gamefication/entities/gamefication.entity";

import { ErrorUtil } from "utils/error";

import { Token } from "types/token";

interface AddCardParams {
	GameficationRepository: GameficationRepository;
	user: Token;
	CardRepository: CardRepository;
	currentCards: Array<CardUser>;
	cardCode: string;
}

interface GetCardParams {
	CardRepository: CardRepository;
	cardCode: string;
}

const getCard = async ({ CardRepository, cardCode }: GetCardParams) => {
	const card = await CardRepository.findOne(null, {
		where: {
			code: cardCode,
		},
		select: ["code", "necessaryToAchieve"],
	});

	if (!card) {
		ErrorUtil.notFound("CARD_NOT_FOUND");
	}

	return card;
};

const getNewCard = (card: CardEntity) => {
	if (card.necessaryToAchieve) {
		return {
			cardCode: card.code,
			currentProgress: 1,
			necessaryToAchieve: card.necessaryToAchieve,
		};
	}

	return {
		cardCode: card.code,
	};
};

export const addCard = async ({
	GameficationRepository,
	CardRepository,
	currentCards,
	user,
	cardCode,
}: AddCardParams) => {
	const card = await getCard({
		CardRepository,
		cardCode,
	});

	const newCard = getNewCard(card);

	const cards = [...currentCards, newCard];

	await GameficationRepository.update(
		{
			userId: user.id,
		},
		{
			cards,
		},
	);

	return cards;
};
