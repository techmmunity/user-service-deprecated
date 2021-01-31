import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { TutorialService } from "./tutorial.service";

import { TutorialController } from "./tutorial.controller";

import { TutorialEntity } from "./tutorial.entity";

@Module({
	imports: [TypeOrmModule.forFeature([TutorialEntity])],
	providers: [TutorialService],
	controllers: [TutorialController],
})
export class TutorialModule {
	//
}
