import { v4 } from "uuid";

import { TermsAndPoliciesService } from "api/terms-and-policies/terms-and-policies.service";

import { TermsAndPoliciesMock } from "tests/mocks/terms-and-policies";

const userId = v4();

describe("TermsAndPoliciesService > create", () => {
	let service: TermsAndPoliciesService;

	beforeAll(async () => {
		service = await TermsAndPoliciesMock.service();
	});

	beforeEach(() => {
		TermsAndPoliciesMock.repository.resetMock();
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});

	it("should create termsAndPolicies with valid params", async () => {
		const termsAndPoliciesDoc = TermsAndPoliciesMock.doc({
			userId,
			version: 1,
		});

		TermsAndPoliciesMock.repository.save.mockReturnValue(termsAndPoliciesDoc);

		const termsAndPolicies = await service.accept({
			userId,
			version: 1,
		});

		expect(TermsAndPoliciesMock.repository.save).toBeCalledTimes(1);
		expect(termsAndPolicies).toMatchObject(termsAndPoliciesDoc);
	});
});
