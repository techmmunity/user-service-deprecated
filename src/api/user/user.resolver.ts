import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";

import { UserService } from "api/user/user.service";

import { UserEntity } from "api/user/entities/user.entity";

import { GetProfileReturn } from "./returns/get-profile.return";
import { VerifyAccountReturn } from "./returns/verify-account.return";

@Resolver("User")
export class UserResolver {
	public constructor(private readonly UserService: UserService) {
		//
	}

	@Mutation(() => VerifyAccountReturn)
	public verifyAccount(
		@Args({ name: "confirmationCode" }) confirmationCode: string,
	) {
		return this.UserService.verifyAccount(confirmationCode);
	}

	@Query(() => [UserEntity])
	public users() {
		return this.UserService.findBy();
	}

	@Query(() => GetProfileReturn)
	public getProfile(@Args({ name: "username" }) username: string) {
		return this.UserService.getProfile(username);
	}
}
