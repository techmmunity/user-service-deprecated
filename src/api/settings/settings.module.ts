import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { SettingsService } from "./settings.service";

import { SettingsController } from "./settings.controller";

import { SettingEntity } from "./setting.entity";

@Module({
	imports: [TypeOrmModule.forFeature([SettingEntity])],
	providers: [SettingsService],
	controllers: [SettingsController],
})
export class SettingsModule {
	//
}
