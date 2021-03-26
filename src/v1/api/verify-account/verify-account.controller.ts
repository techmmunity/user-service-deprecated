import { Controller, Param, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { VerifyAccountService } from "./verify-account.service";

import { VerifyAccountSchema } from "./service/verify/schema";

import { Routes } from "v1/config/routes";

@ApiTags("Verify Account")
@Controller(`${Routes.version}/verify-account`)
export class VerifyAccountController {
	public constructor(private VerifyAccountService: VerifyAccountService) {
		//
	}

	@Put(Routes.verifyAccount.verify)
	public verify(params: VerifyAccountSchema) {
		return this.VerifyAccountService.verify(params);
	}
}
