import { makeMockRepository } from "../repository";
import { doc } from "./doc";

import { service } from "./service";

const repository = makeMockRepository();

export const DiscordMock = {
	doc,
	repository,
	service: service(repository),
};
