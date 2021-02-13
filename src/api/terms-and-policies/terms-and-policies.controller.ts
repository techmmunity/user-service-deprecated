import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { TermsAndPoliciesService } from "./terms-and-policies.service";

import { AcceptParams } from "./service/accept";

import { MessagePatterns } from "config/message-patterns";

@Controller()
export class TermsAndPoliciesController {
	public constructor(private TermsAndPoliciesService: TermsAndPoliciesService) {
		//
	}

	@MessagePattern(MessagePatterns.termsAndPolicies.accept)
	public accept(params: AcceptParams) {
		return this.TermsAndPoliciesService.accept(params);
	}
}
