import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Comment } from "@prisma/client";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { NotificationGateway } from "src/common/gateway/notification.gateway";

@Injectable()
export class CommentService {
  public constructor(
      private readonly prisma: PrismaService,
      private readonly notificationGateway: NotificationGateway
  ) {}

  public async createComment(data: { content: string; postId: string; authorId: string }): Promise<Comment> {
    const post = await this.prisma.post.findUnique({
      where: { id: data.postId }
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${data.postId} not found.`);
    }

    // Pas besoin de vérifier l'utilisateur puisqu'il est authentifié
    // L'ID vient du token JWT qui est déjà validé

    try {
      const comment = await this.prisma.comment.create({
        data: {
          content: data.content,
          postId: data.postId,
          authorId: data.authorId
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatarUrl: true
            }
          }
        }
      });

      // N'envoyez pas de notification si l'auteur commente son propre post
      if (post.authorId !== data.authorId) {
        this.notificationGateway.sendNotificationToUser(
            post.authorId,
            `${comment.author.name} a commenté votre post !`
        );
      }

      return comment;
    } catch (error) {
      throw new BadRequestException(`Failed to create comment: ${error.message}`);
    }
  }

  public async getCommentsByPostId(postId: string): Promise<Comment[]> {
    try {
      return await this.prisma.comment.findMany({
        where: { postId },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatarUrl: true
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      });
    } catch (error) {
      throw new BadRequestException(`Failed to fetch comments: ${error.message}`);
    }
  }

  public async getCommentsByUserId(userId: string): Promise<Comment[]> {
    try {
      return await this.prisma.comment.findMany({
        where: { authorId: userId },
        include: {
          post: {
            select: {
              id: true,
              title: true
            }
          }
        },
        orderBy: {
          createdAt: "desc"
        }
      });
    } catch (error) {
      throw new BadRequestException(`Failed to fetch user comments: ${error.message}`);
    }
  }

  public async editComment(commentId: string, dto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId }
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${commentId} not found.`);
    }

    try {
      return await this.prisma.comment.update({
        where: { id: commentId },
        data: {
          content: dto.content
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatarUrl: true
            }
          }
        }
      });
    } catch (error) {
      throw new BadRequestException(`Failed to update comment: ${error.message}`);
    }
  }

  public async deleteComment(commentId: string): Promise<void> {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId }
    });

    if (!comment) {
      throw new NotFoundException(`Comment with ID ${commentId} not found.`);
    }

    try {
      await this.prisma.comment.delete({
        where: { id: commentId }
      });
    } catch (error) {
      throw new BadRequestException(`Failed to delete comment: ${error.message}`);
    }
  }
}