import { makeMockRepository } from "../repository";
import { doc } from "./doc";

import { service } from "./service";

const repository = makeMockRepository();

export const TermsAndPoliciesMock = {
	doc,
	repository,
	service: service(repository),
};
