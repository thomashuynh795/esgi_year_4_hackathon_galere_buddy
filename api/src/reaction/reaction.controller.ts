import { Controller, Delete, HttpStatus, Param, Res, UseGuards } from "@nestjs/common";
import { ReactionService } from "./reaction.service";
import { ReactionGuard } from "./guard/reaction.guard";
import { Response } from "express";
import { ErrorHandlerService } from "src/common/utils/error-handler/error-handler.service";
import { JwtGuard } from "src/auth/guard/jwt.guard";
import { RolesGuard } from "src/auth/guard/roles.guard";
import { Roles } from "src/auth/decorator/roles.decorator";
import { Role } from "@prisma/client";

@Controller("reactions")
export class ReactionController {
    constructor(
        private readonly reactionService: ReactionService,
        private readonly errorHandlerService: ErrorHandlerService
    ) { }

    @UseGuards(JwtGuard, RolesGuard, ReactionGuard)
    @Roles(Role.ADMIN, Role.MEMBER)
    @Delete(":reactionId")
    public async deleteReaction(
        @Param("reactionId") reactionId: string,
        @Res() response: Response
    ): Promise<Response> {
        try {
            await this.reactionService.deleteReaction(reactionId);

            return response
                .status(HttpStatus.NO_CONTENT)
                .json();
        } catch (error: any) {
            console.log(error);
            return this.errorHandlerService
            .getErrorForControllerLayer(
                error,
                response
            );
        }
    }
}
