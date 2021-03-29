import { v4 } from "uuid";

import { ContactTypeEnum } from "core/enums/contact-type";

export interface CreateContactDoc {
	userId: string;
	type: ContactTypeEnum;
	value: string;
	primary?: boolean;
}

export const doc = ({ userId, type, value, primary }: CreateContactDoc) => ({
	id: v4(),
	userId,
	type,
	value,
	primary: primary || false,
});
