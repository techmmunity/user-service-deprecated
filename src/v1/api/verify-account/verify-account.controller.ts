import { Controller, Param, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { VerifyAccountService } from "./verify-account.service";

import { Routes } from "v1/config/routes";

@ApiTags("Verify Account")
@Controller(`${Routes.version}/verify-account`)
export class VerifyAccountController {
	public constructor(private VerifyAccountService: VerifyAccountService) {
		//
	}

	@Put(Routes.verifyAccount.verify)
	public verifyAccount(@Param("confirmationCode") confirmationCode: string) {
		return this.VerifyAccountService.verify(confirmationCode);
	}
}
