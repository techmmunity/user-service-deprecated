import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { VerifyAccountService } from "./verify-account.service";

import { MessagePatterns } from "config/message-patterns";

@Controller()
export class VerifyAccountController {
	public constructor(private VerifyAccountService: VerifyAccountService) {
		//
	}

	@MessagePattern(MessagePatterns.verifyAccount.verify)
	public verifyAccount(confirmationCode: string) {
		return this.VerifyAccountService.verify(confirmationCode);
	}
}
