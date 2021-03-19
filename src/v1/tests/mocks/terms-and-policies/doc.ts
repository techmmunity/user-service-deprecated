import { v4 } from "uuid";

export interface GetTermsAndPoliciesDocsParams {
	userId: string;
	version: number;
}

export const doc = ({ userId, version }: GetTermsAndPoliciesDocsParams) => ({
	id: v4(),
	userId,
	version,
});
