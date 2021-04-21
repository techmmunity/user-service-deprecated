import { Body, Controller, Post } from "@nestjs/common";
import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiTags,
} from "@nestjs/swagger";

import { ContactService } from "./contact.service";

import { CreateContactBadRequestSchema } from "./service/create/schemas/bad-request.schema";
import { CreateContactConflictSchema } from "./service/create/schemas/conflict.schema";
import { CreateContactInputSchema } from "./service/create/schemas/input.schema";
import { CreateContactOutputSchema } from "./service/create/schemas/output.schema";

import { Routes } from "v1/config/routes";

@ApiTags("Contact")
@Controller(`${Routes.version}/contact`)
export class ContactController {
	public constructor(private ContactService: ContactService) {
		//
	}

	@Post(Routes.contact.create)
	@ApiCreatedResponse({
		type: CreateContactOutputSchema,
		isArray: true,
	})
	@ApiBadRequestResponse({
		type: CreateContactBadRequestSchema,
	})
	@ApiConflictResponse({
		type: CreateContactConflictSchema,
	})
	public create(@Body() data: CreateContactInputSchema) {
		return this.ContactService.create(data);
	}
}
