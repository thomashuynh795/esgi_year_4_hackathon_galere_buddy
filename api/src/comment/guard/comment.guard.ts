import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CommentGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const commentId = request.params.commentId;

    if (!user) {
      throw new ForbiddenException("You are not authenticated.");
    }

    // Les admins ont toujours accès
    if (user.role === "ADMIN") {
      return true;
    }

    // Cas de modification/suppression d'un commentaire existant
    if (commentId) {
      const comment = await this.prisma.comment.findUnique({
        where: { id: commentId }
      });

      if (!comment) {
        throw new ForbiddenException("Comment not found.");
      }

      if (comment.authorId !== user.id) {
        throw new ForbiddenException("You are not the author of this comment.");
      }
    }

    return true;
  }
}