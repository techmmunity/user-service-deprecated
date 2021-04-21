import { ContactModule } from "./contact/contact.module";
import { HealthModule } from "./health/health.module";
import { UserModule } from "v1/api/user/user.module";

export const Api = [ContactModule, HealthModule, UserModule];
