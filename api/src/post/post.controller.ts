import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards } from "@nestjs/common";
import { PostService } from "./post.service";
import { ErrorHandlerService } from "src/common/utils/error-handler/error-handler.service";
import { CommentService } from "src/comment/comment.service";
import { Response } from "express";
import { CreateCommentDto } from "src/comment/dto/create-comment.dto";
import { CommentGuard } from "src/comment/guard/comment.guard";
import { ReactionGuard } from "src/reaction/guard/reaction.guard";
import { CreateReactionDto } from "src/reaction/dto/create-reaction.dto";
import { ReactionService } from "src/reaction/reaction.service";
import { RolesGuard } from "src/auth/guard/roles.guard";
import { JwtGuard } from "src/auth/guard/jwt.guard";
import { Role } from "@prisma/client";
import { Roles } from "src/auth/decorator/roles.decorator";

@Controller("post")
export class PostController {
    constructor(
        private readonly postService: PostService,
        private readonly errorHandlerService: ErrorHandlerService,
        private readonly commentService: CommentService,
        private readonly reactionService: ReactionService
    ) { }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.MEMBER)
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

    @UseGuards(JwtGuard, RolesGuard, CommentGuard)
    @Roles(Role.ADMIN, Role.MEMBER)
    @Post(":id/comments")
    public async commentPost(
        @Param("id") postId: string,
        @Body() createCommentDto: CreateCommentDto,
        @Res() response: Response
    ): Promise<Response> {
        try {
            createCommentDto.postId = postId;
            const comment = await this.commentService.createComment(createCommentDto);

            return response
                .status(HttpStatus.CREATED)
                .json(comment);
        } catch (error: any) {
            return this.errorHandlerService
            .getErrorForControllerLayer(
                error,
                response
            );
        }
    }

    @UseGuards(JwtGuard, RolesGuard, ReactionGuard)
    @Roles(Role.ADMIN, Role.MEMBER)
    @Post(":id/reactions")
    public async reactPost(
        @Param("id") postId: string,
        @Body() createReactionDto: CreateReactionDto,
        @Res() response: Response
    ): Promise<Response> {
        try {
            createReactionDto.postId = postId;
            const reaction = await this.reactionService.addReaction(createReactionDto);

            return response
                .status(HttpStatus.CREATED)
                .json(reaction);
        } catch (error: any) {
            return this.errorHandlerService
            .getErrorForControllerLayer(
                error,
                response
            );
        }
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.MEMBER)
    @Get(":id/reactions")
    public async getReactionsOfPost(
        @Param("id") postId: string,
        @Res() response: Response
    ): Promise<Response> {
        try {
            const reactions = this.reactionService.getReactionsByPostId(postId);

            return response
                .status(HttpStatus.OK)
                .json(reactions);
        } catch (error: any) {
            return this.errorHandlerService
            .getErrorForControllerLayer(
                error,
                response
            );
        }
    }
}
