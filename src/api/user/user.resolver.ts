import { Resolver, Query } from "@nestjs/graphql";

import { UserService } from "api/user/user.service";

import { UserEntity } from "api/user/user.entity";

@Resolver("User")
export class UserResolver {
	public constructor(private readonly UserService: UserService) {
		//
	}

	@Query(() => [UserEntity])
	public users() {
		return this.UserService.findBy();
	}
}
