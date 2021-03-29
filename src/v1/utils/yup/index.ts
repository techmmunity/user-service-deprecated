/**
 *
 * Every Time that a function be added here,
 * you need to add the type to
 * the types/yup.d.ts file
 *
 */

import * as yup from "yup";

import { emailOrPhone } from "./string/email-or-phone";
import { emailOrUsername } from "./string/email-or-username";
import { fullName } from "./string/full-name";
import { password } from "./string/password";
import { username } from "./string/username";

export type Yup = typeof yup;

emailOrPhone(yup);
emailOrUsername(yup);
username(yup);
password(yup);
fullName(yup);

export const InvalidParamsErrorMessage = `this must be a \`object\` type, but the final value was: \`null\` (cast from the value \`""\`).
 If "null" is intended as an empty value be sure to mark the schema as \`.nullable()\``;

export { yup };
