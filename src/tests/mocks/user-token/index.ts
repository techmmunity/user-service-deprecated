import { mameMockRepository } from "../repository";
import { doc } from "./doc";

import { service } from "./service";

const repository = mameMockRepository();

export const UserTokenMock = {
	doc,
	repository,
	service: service(repository),
};
