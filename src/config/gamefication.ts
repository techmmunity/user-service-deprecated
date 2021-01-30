/**
 * ATENTION: THIS FORMULA CAN'T BE CHANGED!
 * --
 * It's here just to facilitate the undestending of the gamefication
 */
export const calcXpToReachLvl = (lvlToReach: number) =>
	341 * Math.pow(lvlToReach, 2);
