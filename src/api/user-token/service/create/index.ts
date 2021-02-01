import {
	UserTokenRepository,
	UserTokenType,
} from "api/user-token/user-token.entity";

interface Injectables {
	UserTokenRepository: UserTokenRepository;
}

export const create = (params: UserTokenType & Injectables) => {
	const { UserTokenRepository, ...userTokenData } = params;

	return UserTokenRepository.save(userTokenData);
};
