import { Controller } from "@nestjs/common";
import { ReactionService } from "./reaction.service";

@Controller("like")
export class ReactionController {
    constructor(private readonly likeService: ReactionService) { }
}
