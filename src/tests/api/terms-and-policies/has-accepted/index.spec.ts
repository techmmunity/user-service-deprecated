import { v4 } from "uuid";

import { TermsAndPoliciesService } from "api/terms-and-policies/terms-and-policies.service";

import { TermsAndPoliciesMock } from "tests/mocks/terms-and-policies";

describe("TermsAndPoliciesService > hasAccepted", () => {
	let service: TermsAndPoliciesService;

	const userId = v4();

	beforeAll(async () => {
		service = await TermsAndPoliciesMock.service();
	});

	beforeEach(() => {
		TermsAndPoliciesMock.repository.resetMock();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should return termsAndPolicies with valid params", async () => {
		const termsAndPoliciesDoc = TermsAndPoliciesMock.doc({
			userId,
			version: 1,
		});

		TermsAndPoliciesMock.repository.findOne.mockReturnValue(
			termsAndPoliciesDoc,
		);

		const termsAndPolicies = await service.hasAccepted({
			userId,
			version: 1,
		});

		expect(TermsAndPoliciesMock.repository.findOne).toBeCalledTimes(1);
		expect(termsAndPolicies).toMatchObject(termsAndPoliciesDoc);
	});
});
