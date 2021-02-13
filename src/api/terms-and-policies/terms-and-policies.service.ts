import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { accept, AcceptParams } from "./service/accept";

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

	public accept(params: AcceptParams) {
		return accept({
			TermsAndPoliciesRepository: this.TermsAndPoliciesRepository,
			...params,
		});
	}
}
