import { getPrimaryContact } from "./helpers/get-primary-contact";

import { validate } from "./validate";

import { ContactRepository } from "v1/api/contact/contact.entity";
import { UserRepository } from "v1/api/user/user.entity";

import { ErrorUtil } from "v1/utils/error";

interface Injectables {
	ContactRepository: ContactRepository;
	UserRepository: UserRepository;
}

export interface FindParams {
	identifier: string;
}

export const find = async (
	{ ContactRepository, UserRepository }: Injectables,
	params: FindParams,
) => {
	await validate(params);

	const { identifier } = params;

	/**
	 * Success Flows:
	 * - Found the contact by value and it is also the primary contact
	 * - Found the user by username/id and then found the primary contact
	 * - Found the contact by value and then found the primary contact
	 *
	 * Error Flows:
	 * - Found the user by username/id and then DIDN'T find the primary contact
	 * - Found the contact by value and then DIDN'T find the primary contact
	 * - Found neither user nor contacts
	 *
	 * Comments:
	 * - The search for the primary contact cannot be done with the others,
	 * since it would be just "primary: true", and that would bring the primary
	 * contacts of all users
	 * - It is impossible to find 2 users by searching via username/id,
	 * given that the ID and username pattern are different
	 * - Currently, the search for the user needs to be done via find instead
	 * of findOne, since TypeORM does not have multiple conditions in findOne
	 * - Currently, the search for the contact needs to be done via find
	 * instead of findOne, since TypeORM does not support relations in findOne
	 */

	const [users, contacts] = await Promise.all([
		UserRepository.find({
			where: [
				{
					id: identifier,
				},
				{
					username: identifier,
				},
			],
			take: 1,
		}),
		ContactRepository.find({
			where: [
				{
					value: identifier,
					verified: true,
				},
			],
			relations: ["user"],
			take: 1,
		}),
	]);

	const user = users.shift();
	const contact = contacts.shift();

	/**
	 * If this have found the contact and he is the primary contact, this
	 * will already have all the necessary information to return
	 */
	if (contact && contact.primary) {
		return {
			userId: contact.userId,
			username: contact.user.username,
			primaryContact: contact.value,
			primaryContactType: contact.type,
		};
	}

	if (user) {
		const primaryContact = await getPrimaryContact({
			ContactRepository,
			userId: user.id,
		});

		return {
			userId: user.id,
			username: user.username,
			primaryContact: primaryContact.value,
			primaryContactType: primaryContact.type,
		};
	}

	if (contact) {
		const primaryContact = await getPrimaryContact({
			ContactRepository,
			userId: contact.userId,
		});

		return {
			userId: contact.userId,
			username: contact.user.username,
			primaryContact: primaryContact.value,
			primaryContactType: primaryContact.type,
		};
	}

	return ErrorUtil.notFound(["User not found"]);
};
