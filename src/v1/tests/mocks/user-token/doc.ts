import { UserTokenType } from "v1/api/user-token/user-token.entity";

import { IntegrationsEnum } from "core/enums/integrations";

export interface GetVerifyAccountDocsParams {
	userId: string;
	type?: IntegrationsEnum;
	accessToken?: string;
	refreshToken?: string;
	expirationDate?: Date;
}

export const doc = ({
	userId,
	type,
	accessToken,
	refreshToken,
	expirationDate,
}: GetVerifyAccountDocsParams): UserTokenType => {
	const userTokenDoc = {
		id: userId,
		discordAccessToken: (null as unknown) as string,
		discordRefreshToken: (null as unknown) as string,
		discordExpirationDate: (null as unknown) as Date,
		linkedinAccessToken: (null as unknown) as string,
		linkedinRefreshToken: (null as unknown) as string,
		linkedinExpirationDate: (null as unknown) as Date,
		githubAccessToken: (null as unknown) as string,
		githubRefreshToken: (null as unknown) as string,
		githubExpirationDate: (null as unknown) as Date,
		googleAccessToken: (null as unknown) as string,
		googleRefreshToken: (null as unknown) as string,
		googleExpirationDate: (null as unknown) as Date,
	};

	if (type) {
		return ({
			...userTokenDoc,
			[`${type.toLowerCase()}accessToken`]: accessToken,
			[`${type.toLowerCase()}refreshToken`]: refreshToken,
			[`${type.toLowerCase()}expirationDate`]: expirationDate,
		} as unknown) as UserTokenType;
	}

	return userTokenDoc;
};
