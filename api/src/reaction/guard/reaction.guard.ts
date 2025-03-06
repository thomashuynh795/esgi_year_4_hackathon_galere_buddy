import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ReactionGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const reactionId = request.params.reactionId;
    const dto = request.body;

    if (!user) {
      throw new ForbiddenException("You are not authenticated.");
    }

    if (user.role === "ADMIN") {
      return true;
    }

    if (reactionId && Object.keys(dto).length === 0) {
      const reaction = await this.prisma.reaction.findUnique({
        where: { id: reactionId }
      });

      if (reaction.userId !== user.id) {
        throw new ForbiddenException("You are not the user of this reaction.");
      }
    }

    if (!reactionId && dto) {
      if (dto.userId !== user.id) {
        throw new ForbiddenException("You cannot add a reaction for another user.");
      }
    }

    return true;
  }
}
