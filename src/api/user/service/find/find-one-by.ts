import { FindOneOptions } from "typeorm";

import { UserEntity, UserRepository } from "api/user/entities/user.entity";

interface IParams {
	UserRepository: UserRepository;
	options?: FindOneOptions<UserEntity>;
}

export const findOneBy = ({ UserRepository, options }: IParams) => {
	return UserRepository.findOne(options);
};
