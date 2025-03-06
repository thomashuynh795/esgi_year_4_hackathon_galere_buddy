import { Module } from "@nestjs/common";
import { PostService } from "./post.service";
import { PostController } from "./post.controller";
import { CommentService } from "src/comment/comment.service";
import { ErrorHandlerService } from "src/common/utils/error-handler/error-handler.service";
import { ReactionService } from "src/reaction/reaction.service";
import { NotificationGateway } from "src/common/gateway/notification.gateway";

@Module({
    controllers: [PostController],
    providers: [
        PostService,
        CommentService,
        ErrorHandlerService,
        ReactionService,
        NotificationGateway
    ]
})
export class PostModule { }
