import { Module } from "@nestjs/common";

import { VerifyAccountService } from "./verify-account.service";

import { VerifyAccountResolver } from "./verify-account.resolver";

@Module({
	providers: [VerifyAccountService, VerifyAccountResolver],
})
export class VerifyAccountModule {
	//
}
