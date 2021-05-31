import { Injectable } from "@nestjs/common";
import { HealthIndicator } from "@nestjs/terminus";

@Injectable()
export class ApiHealthIndicator extends HealthIndicator {
	// eslint-disable-next-line require-await
	public async pingCheck(key: string) {
		return this.getStatus(key, true);
	}
}
