import {
	CardUser,
	GameficationRepository,
} from "api/gamefication/entities/gamefication.entity";

import { Token } from "types/token";

interface UpdateCardParams {
	GameficationRepository: GameficationRepository;
	currentCards: Array<CardUser>;
	user: Token;
	card: CardUser;
}

export const updateCard = async ({
	GameficationRepository,
	currentCards,
	user,
	card,
}: UpdateCardParams) => {
	const cardCode = card.cardCode;

	const oldCards = currentCards.filter(card => card.cardCode !== cardCode);

	const updatedCard = {
		...card,
		currentProgress: card.currentProgress + 1,
	};

	const cards = [...oldCards, updatedCard];

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
