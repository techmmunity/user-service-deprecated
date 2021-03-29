import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { ContactService } from "./contact.service";

import { CreateContactSchema } from "./service/create/schema";

import { Routes } from "v1/config/routes";

@ApiTags("Contact")
@Controller(`${Routes.version}/contact`)
export class ContactController {
	public constructor(private ContactService: ContactService) {
		//
	}

	@Post(Routes.contact.create)
	public create(@Body() data: CreateContactSchema) {
		return this.ContactService.create(data);
	}
}
