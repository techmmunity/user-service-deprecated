import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { VerifyAccountService } from "./verify-account.service";

import { VerifyAccountReturn } from "./returns/verify-account.return";

@Resolver()
export class VerifyAccountResolver {
	public constructor(
		private readonly VerifyAccountService: VerifyAccountService,
	) {
		//
	}

	@Mutation(() => VerifyAccountReturn)
	public verifyAccount(
		@Args({ name: "confirmationCode" }) confirmationCode: string,
	) {
		return this.VerifyAccountService.verify(confirmationCode);
	}
}
