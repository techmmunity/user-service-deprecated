import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transactional } from "typeorm-transactional-cls-hooked";

import { accept, AcceptParams } from "./service/accept";
import { hasAccepted } from "./service/has-accepted";

import {
	TermsAndPoliciesEntity,
	TermsAndPoliciesRepository,
} from "./terms-and-policies.entity";

@Injectable()
export class TermsAndPoliciesService {
	public constructor(
		@InjectRepository(TermsAndPoliciesEntity)
		private readonly TermsAndPoliciesRepository: TermsAndPoliciesRepository,
	) {
		//
	}

	@Transactional()
	public accept(params: AcceptParams) {
		return accept({
			TermsAndPoliciesRepository: this.TermsAndPoliciesRepository,
			...params,
		});
	}

	@Transactional()
	public hasAccepted(params: AcceptParams) {
		return hasAccepted({
			TermsAndPoliciesRepository: this.TermsAndPoliciesRepository,
			...params,
		});
	}
}
