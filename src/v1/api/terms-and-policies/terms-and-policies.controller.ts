import { Controller, Get, Param, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { TermsAndPoliciesService } from "./terms-and-policies.service";

import { AcceptParams } from "./service/accept";

import { Routes } from "v1/config/routes";

@ApiTags("Terms And Policies")
@Controller(`${Routes.version}/terms-and-policies`)
export class TermsAndPoliciesController {
	public constructor(private TermsAndPoliciesService: TermsAndPoliciesService) {
		//
	}

	@Put(Routes.termsAndPolicies.accept)
	public accept(params: AcceptParams) {
		return this.TermsAndPoliciesService.accept(params);
	}

	@Get(Routes.termsAndPolicies.hasAccepted)
	public hasAccepted(
		@Param("userId") userId: string,
		@Param("version") version: string,
	) {
		return this.TermsAndPoliciesService.hasAccepted({
			userId,
			version: parseInt(version || "0"),
		});
	}
}
