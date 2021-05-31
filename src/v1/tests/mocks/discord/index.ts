import { makeMockRepository } from "../repository";
import { doc } from "./doc";

import { service } from "./service";

const repository = makeMockRepository();

export const discordMock = {
	doc,
	repository,
	service: service(repository),
};
