import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TermsAndPoliciesService } from "./terms-and-policies.service";

import { TermsAndPoliciesController } from "./terms-and-policies.controller";

import { TermsAndPoliciesEntity } from "./terms-and-policies.entity";

@Module({
	imports: [TypeOrmModule.forFeature([TermsAndPoliciesEntity])],
	providers: [TermsAndPoliciesService],
	controllers: [TermsAndPoliciesController],
})
export class TermsAndPoliciesModule {
	//
}
