import { Module } from "@nestjs/common";

import { TermsAndPoliciesService } from "./terms-and-policies.service";

import { TermsAndPoliciesController } from "./terms-and-policies.controller";

@Module({
	providers: [TermsAndPoliciesService],
	controllers: [TermsAndPoliciesController],
})
export class TermsAndPoliciesModule {
	//
}
