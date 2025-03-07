import { Module } from "@nestjs/common";
import { InitiativeService } from "./initiative.service";
import { InitiativeController } from "./initiative.controller";
import {PrismaService} from "../prisma/prisma.service";
import {BadgeService} from "../badge/badge.service";

@Module({
  controllers: [InitiativeController],
  providers: [InitiativeService, PrismaService, BadgeService]
})
export class InitiativeModule {}
