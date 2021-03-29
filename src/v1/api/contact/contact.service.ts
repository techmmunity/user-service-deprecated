import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transactional } from "typeorm-transactional-cls-hooked";

import { create, CreateParams } from "./service/create";

import { ContactEntity, ContactRepository } from "./contact.entity";

@Injectable()
export class ContactService {
	public constructor(
		@InjectRepository(ContactEntity)
		private readonly ContactRepository: ContactRepository,
	) {
		//
	}

	@Transactional()
	public create(params: CreateParams) {
		return create(
			{
				ContactRepository: this.ContactRepository,
			},
			params,
		);
	}
}
