import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { VerifyAccountService } from "./verify-account.service";

@Controller()
export class VerifyAccountController {
	public constructor(private VerifyAccountService: VerifyAccountService) {
		//
	}

	@MessagePattern("verify-account")
	public verifyAccount(confirmationCode: string) {
		return this.VerifyAccountService.verify(confirmationCode);
	}
}
