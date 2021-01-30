import { FindManyOptions } from "typeorm";

import { UserEntity, UserRepository } from "api/user/user.entity";

interface IParams {
	UserRepository: UserRepository;
	options?: FindManyOptions<UserEntity>;
}

export const findBy = ({ UserRepository, options }: IParams) => {
	return UserRepository.find(options);
};
