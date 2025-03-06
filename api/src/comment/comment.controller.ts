import { Body, Controller, Delete, HttpStatus, Param, Put, Res, UseGuards } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { ErrorHandlerService } from "src/common/utils/error-handler/error-handler.service";
import { Response } from "express";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { CommentGuard } from "./guard/comment.guard";
import { JwtGuard } from "src/auth/guard/jwt.guard";
import { RolesGuard } from "src/auth/guard/roles.guard";
import { Role } from "@prisma/client";
import { Roles } from "src/auth/decorator/roles.decorator";

@Controller("comment")
export class CommentController {
    constructor(
        private readonly commentService: CommentService,
        private readonly errorHandlerService: ErrorHandlerService
    ) { }

    @UseGuards(JwtGuard, RolesGuard, CommentGuard)
    @Roles(Role.ADMIN, Role.MEMBER)
    @Put(":id")
    public async editComment(
        @Param("id") commentId: string,
        @Body() updateCommentDto: UpdateCommentDto,
        @Res() response: Response
    ): Promise<Response> {
        try {
            const editedComment = this.commentService.editComment(commentId, updateCommentDto);

            return response
                .status(HttpStatus.OK)
                .json(editedComment);
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
    @Delete(":id")
    public async deleteComment(
        @Param("id") commentId: string,
        @Res() response: Response
    ): Promise<Response> {
        try {
           await this.commentService.deleteComment(commentId);
           
           return response
                .status(HttpStatus.NO_CONTENT);
        } catch (error: any) {
            return this.errorHandlerService
            .getErrorForControllerLayer(
                error,
                response
            );
        }
    }
}
