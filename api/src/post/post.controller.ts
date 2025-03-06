import {JwtGuard} from "../auth/guard/jwt.guard";
import {CreatePostDto} from "./dto/create-post.dto";
import {PostService} from "./post.service";
import {CustomisedExpressRequest} from "../common/models/customised-express-request";
import {UpdatePostDto} from "./dto/update-post.dto";
import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res, UseGuards} from "@nestjs/common";
import { ErrorHandlerService } from "src/common/utils/error-handler/error-handler.service";
import { CommentService } from "src/comment/comment.service";
import { Response } from "express";
import { CreateCommentDto } from "src/comment/dto/create-comment.dto";
import { CommentGuard } from "src/comment/guard/comment.guard";
import { ReactionGuard } from "src/reaction/guard/reaction.guard";
import { CreateReactionDto } from "src/reaction/dto/create-reaction.dto";
import { ReactionService } from "src/reaction/reaction.service";
import { RolesGuard } from "src/auth/guard/roles.guard";
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


    @Get()
    async findAll() {
        return this.postService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.postService.findOne(id);
    }

    @Get("trending")
    async findTrending() {
        return this.postService.findTrending();
    }

    @Post()
    @UseGuards(JwtGuard)
    async create(@Body() createPostDto: CreatePostDto,
                 @Req() req: CustomisedExpressRequest) {
        return this.postService.create(createPostDto,req.user.id );
    }

    @Delete(":id")
    @UseGuards(JwtGuard)
    async delete(@Param("id") id: string,
                 @Req() req: CustomisedExpressRequest) {
        return this.postService.delete(id,req.user.id);
    }

    @Patch(":id")
    @UseGuards(JwtGuard)
    async update(@Param("id") id: string,
                 @Body() updatePostDto: UpdatePostDto,
                 @Req() req: CustomisedExpressRequest) {
        return this.postService.update(id,updatePostDto,req.user.id);
    }


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
            const reactions = await this.reactionService.getReactionsByPostId(postId);
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
