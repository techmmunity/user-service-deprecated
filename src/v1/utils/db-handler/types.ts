import { ErrorUtil } from "../error";

import { DbErrorEnum } from "core/enums/db-error";

export interface DbComplexErrorMessage {
	table: string;
	column: string;
	message: (value: any) => string;
	error: DbErrorEnum;
	handleWith: keyof typeof ErrorUtil;
	validate?: (value: any) => boolean;
}
