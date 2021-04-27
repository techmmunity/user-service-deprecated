import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {
	HealthCheck,
	HealthCheckService,
	TypeOrmHealthIndicator,
} from "@nestjs/terminus";

import { ApiHealthIndicator } from "./health.indicator";

import { ApiConfig } from "v1/config";

@ApiTags("Health")
@Controller(`${ApiConfig.version}/health`)
export class HealthController {
	public constructor(
		private readonly health: HealthCheckService,
		private readonly db: TypeOrmHealthIndicator,
		private readonly api: ApiHealthIndicator,
	) {
		//
	}

	@Get()
	@HealthCheck()
	public check() {
		return this.health.check([
			() => this.db.pingCheck("database"),
			() => this.api.pingCheck(`api/${ApiConfig.version}`),
		]);
	}
}
