import { mameMockRepository } from "../repository";
import { doc } from "./doc";

import { service } from "./service";

const repository = mameMockRepository();

export const VerifyAccountMock = {
	doc,
	repository,
	service: service(repository),
};
