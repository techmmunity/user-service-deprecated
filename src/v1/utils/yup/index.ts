/**
 *
 * Every Time that a function be added here,
 * you need to add the type to
 * the types/yup.d.ts file
 *
 */

import * as yup from "yup";

import { afterNow } from "./number/after-now";
import { uniqueValues } from "./object/unique-values";
import { emailOrPhone } from "./string/email-or-phone";
import { fullName } from "./string/full-name";
import { identifier } from "./string/identifier";
import { isDiscordSnowflake } from "./string/is-discord-snowflake";
import { password } from "./string/password";
import { username } from "./string/username";

export type Yup = typeof yup;

afterNow(yup);
uniqueValues(yup);
emailOrPhone(yup);
fullName(yup);
identifier(yup);
isDiscordSnowflake(yup);
password(yup);
username(yup);

export const InvalidParamsErrorMessage = `this must be a \`object\` type, but the final value was: \`null\` (cast from the value \`""\`).
 If "null" is intended as an empty value be sure to mark the schema as \`.nullable()\``;

export { yup };
