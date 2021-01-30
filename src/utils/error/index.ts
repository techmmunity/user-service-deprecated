import { badRequest } from "./bad-request";
import { conflict } from "./conflict";
import { forbidden } from "./forbidden";
import { internal } from "./internal";
import { notFound } from "./not-found";
import { unauthorized } from "./unauthorized";

export const ErrorUtil = {
	badRequest,
	conflict,
	forbidden,
	internal,
	unauthorized,
	notFound,
};
