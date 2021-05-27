import { isEmail, isBrazillianPhone } from "@techmmunity/easy-check";

import { CreateParams } from ".";

import { ErrorUtil } from "v1/utils/error";
import { yup } from "v1/utils/yup";

import { ContactTypeEnum, ContactTypeValues } from "core/enums/contact-type";

const schema = yup.object().shape({
	userId: yup.string().required().strict().uuid(),
	contacts: yup
		.array()
		.required()
		.strict()
		.min(1)
		.of(
			yup.object().shape({
				type: yup.string().required().strict().oneOf(ContactTypeValues()),
				value: yup.string().required().strict().emailOrPhone(),
			}),
		),
});

const validateIfTypesAndValuesMatch = (contacts: CreateParams["contacts"]) =>
	contacts.forEach((contact, index) => {
		switch (contact.type) {
			case ContactTypeEnum.EMAIL:
				if (!isEmail(contact.value)) {
					ErrorUtil.badRequest([
						`contacts[${index}].value must be a valid email`,
					]);
				}
				break;
			case ContactTypeEnum.PHONE_NUMBER:
				if (!isBrazillianPhone(contact.value)) {
					ErrorUtil.badRequest([
						`contacts[${index}].value must be a valid phone number`,
					]);
				}
				break;
		}
	});

export const validate = async (params: CreateParams) => {
	const formattedParams = await schema
		.validate(params)
		.catch(err => ErrorUtil.badRequest(err.errors));

	validateIfTypesAndValuesMatch(params.contacts);

	return formattedParams;
};
