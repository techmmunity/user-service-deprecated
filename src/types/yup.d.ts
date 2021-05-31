import { BaseSchema } from "yup";
import { AssertsShape, ObjectShape, TypeOfShape } from "yup/lib/object";

import { AnyObject, Maybe, Optionals } from "yup/lib/types";

declare module "yup" {
	interface NumberSchema {
		afterNow: () => this;
	}

	interface StringSchema {
		emailOrPhone: () => this;
		identifier: () => this;
		username: () => this;
		password: () => this;
		fullName: () => this;
		isDiscordSnowflake: () => this;
	}

	interface ObjectSchema<
		TShape extends ObjectShape,
		TContext extends AnyObject = AnyObject,
		TIn extends Maybe<TypeOfShape<TShape>> = TypeOfShape<TShape>,
		TOut extends Maybe<AssertsShape<TShape>> =
			| AssertsShape<TShape>
			| Optionals<TIn>,
	> extends BaseSchema<TIn, TContext, TOut> {
		uniqueValues: (fields: Array<string>) => this;
	}
}
