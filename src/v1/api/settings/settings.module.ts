import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SettingsService } from "./settings.service";

import { SettingsController } from "./settings.controller";

import { SettingsEntity } from "./settings.entity";

@Module({
	imports: [TypeOrmModule.forFeature([SettingsEntity])],
	providers: [SettingsService],
	controllers: [SettingsController],
	exports: [SettingsService],
})
export class SettingsModule {
	//
}
