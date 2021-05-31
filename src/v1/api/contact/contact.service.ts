import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transactional } from "typeorm-transactional-cls-hooked";

import { create, CreateParams } from "./service/create";

import {
	ConfirmationTokenEntity,
	ConfirmationTokenRepository,
} from "../confirmation-token/confirmation-token.entity";
import { ContactEntity, ContactRepository } from "./contact.entity";

@Injectable()
export class ContactService {
	public constructor(
		@InjectRepository(ConfirmationTokenEntity)
		private readonly confirmationTokenRepository: ConfirmationTokenRepository,
		@InjectRepository(ContactEntity)
		private readonly contactRepository: ContactRepository,
	) {}

	@Transactional()
	public create(params: CreateParams) {
		return create(
			{
				confirmationTokenRepository: this.confirmationTokenRepository,
				contactRepository: this.contactRepository,
			},
			params,
		);
	}
}
