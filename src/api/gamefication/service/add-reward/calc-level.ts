import { calcXpToReachLvl } from "config/gamefication";

interface CalcLevelParams {
	currentLvl: number;
	currentXp: number;
	xpToAdd: number;
}

interface AddXpRecursiveParams {
	currentLvl: number;
	currentXp: number;
	xpToAdd: number;
}

interface AddXpRecursiveReturn {
	newCurrentXp: number;
	newCurrentLvl: number;
}

const addXpRecursive = ({
	currentLvl,
	currentXp,
	xpToAdd,
}: AddXpRecursiveParams): AddXpRecursiveReturn => {
	const nextLvl = currentLvl + 1;

	const xpToLvlUp = calcXpToReachLvl(nextLvl);

	const xpRemaining = xpToLvlUp - currentXp;

	if (xpRemaining < xpToAdd) {
		// Add less xp than the necessary to lvl up

		return {
			newCurrentXp: currentXp + xpToAdd,
			newCurrentLvl: currentLvl,
		};
	} else if (xpRemaining === xpToAdd) {
		// Add the exact amount of xp to lvl up

		return {
			newCurrentXp: 0,
			newCurrentLvl: currentLvl + 1,
		};
	} else {
		// Add the xp necessary to lvl up and some more

		return addXpRecursive({
			currentLvl: currentLvl + 1,
			currentXp: 0,
			xpToAdd: xpToAdd - xpRemaining,
		});
	}
};

export const calcLevel = ({
	currentLvl,
	currentXp,
	xpToAdd,
}: CalcLevelParams) => {
	const result = addXpRecursive({
		currentXp,
		currentLvl,
		xpToAdd,
	});

	return {
		levelUps: result.newCurrentLvl - currentLvl,
		...result,
	};
};
