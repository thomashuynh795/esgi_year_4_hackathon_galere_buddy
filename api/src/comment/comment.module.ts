import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { NotificationGateway } from "src/common/gateway/notification.gateway";

@Module({
  controllers: [CommentController],
  providers: [
    CommentService,
    NotificationGateway
  ]
})
export class CommentModule {}
