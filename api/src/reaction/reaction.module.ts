import { Module } from "@nestjs/common";
import { ReactionService } from "./reaction.service";
import { ReactionController } from "./reaction.controller";
import { NotificationGateway } from "src/common/gateway/notification.gateway";

@Module({
    controllers: [ReactionController],
    providers: [
        ReactionService,
        NotificationGateway
    ]
})
export class ReactionModule { }
