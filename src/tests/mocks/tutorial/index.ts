import { mameMockRepository } from "../repository";
import { doc } from "./doc";

import { service } from "./service";

const repository = mameMockRepository();

export const TutorialMock = {
	doc,
	repository,
	service: service(repository),
};
