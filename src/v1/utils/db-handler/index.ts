import { ErrorUtil } from "../error";

import { DbComplexErrorMessage } from "./types";

const getValue = (err: any) =>
	err.detail
		.match(/\((.*?)\)/g)
		?.pop()
		?.replace("(", "")
		?.replace(")", "");

const isCorrectCode = (err: any, handler: DbComplexErrorMessage) =>
	err.code === handler.error;

const isCorrectTable = (err: any, handler: DbComplexErrorMessage) =>
	err.table === handler.table;

const isCorrectColumn = (err: any, handler: DbComplexErrorMessage) =>
	err.detail.includes(handler.column);

const passesValidation = (err: any, handler: DbComplexErrorMessage) => {
	if (!handler.validate) return true;

	const fieldValue = getValue(err);

	if (!fieldValue) return false;

	return handler.validate(fieldValue);
};

export const DbHandler = (handlers: Array<DbComplexErrorMessage>) => (
	err: any,
) => {
	const handler = handlers.find(
		handler =>
			isCorrectCode(err, handler) &&
			isCorrectTable(err, handler) &&
			isCorrectColumn(err, handler) &&
			passesValidation(err, handler),
	);

	const fieldValue = getValue(err);

	return handler
		? ErrorUtil[handler.handleWith]([handler.message(fieldValue)])
		: ErrorUtil.badGateway([err.message]);
};
