import { Controller, Delete, HttpStatus, Param, Res, UseGuards } from "@nestjs/common";
import { ReactionService } from "./reaction.service";
import { ReactionGuard } from "./guard/reaction.guard";
import { Response } from "express";
import { ErrorHandlerService } from "src/common/utils/error-handler/error-handler.service";

@Controller("like")
export class ReactionController {
    constructor(
        private readonly reactionService: ReactionService,
        private readonly errorHandlerService: ErrorHandlerService
    ) { }

    @UseGuards(ReactionGuard)
    @Delete(":id")
    public async deleteReaction(
        @Param("id") reactionId: string,
        @Res() response: Response
    ): Promise<Response> {
        try {
            await this.reactionService.deleteReaction(reactionId);

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
