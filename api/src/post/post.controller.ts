import { Controller, Get, HttpStatus, Param, Res } from "@nestjs/common";
import { PostService } from "./post.service";
import { ErrorHandlerService } from "src/common/utils/error-handler/error-handler.service";
import { CommentService } from "src/comment/comment.service";
import { Response } from "express";

@Controller("post")
export class PostController {
    constructor(
        private readonly postService: PostService,
        private readonly errorHandlerService: ErrorHandlerService,
        private readonly commentService: CommentService
    ) { }

    @Get(":id/comments")
    public async getCommentsOfPost(
        @Param("id") id: string,
        @Res() response: Response
    ): Promise<Response> {
        try {
            const comments = await this.commentService.getCommentsByPostId(id);

            return response
                .status(HttpStatus.OK)
                .json(comments);
        } catch (error: any) {
            return this.errorHandlerService
            .getErrorForControllerLayer(
                error,
                response
            );
        }
    }
}
