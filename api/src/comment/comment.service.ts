import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Comment } from "@prisma/client";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { NotificationGateway } from "src/common/gateway/notification.gateway";

@Injectable()
export class CommentService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly notificationGateway: NotificationGateway
  ) {}

  public async createComment(dto: CreateCommentDto): Promise<Comment> {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id: dto.postId }
      });
      
      if (!post) {
        throw new BadRequestException("Post not found.");
      }

      const user = await this.prisma.user.findUnique({
        where: { id: dto.authorId }
      });
      
      if (!user) {
        throw new BadRequestException("Author not found.");
      }

      const comment = await this.prisma.comment.create({
        data: {
          content: dto.content,
          postId: dto.postId,
          authorId: dto.authorId
        }
      });

      this.notificationGateway.sendNotificationToUser(post.authorId, "Someone comment your post !");

      return comment;
    } catch (error: any) {
      throw error;
    }
  }

  public async getCommentsByPostId(postId: string): Promise<Comment[]> {
    try {
      const comments = await this.prisma.comment.findMany({
        where: {
          postId: postId
        }
      });

      return comments;
    } catch (error: any) {
      throw error;
    }
  }

  public async getCommentsByUserId(userId: string): Promise<Comment[]> {
    try {
      const comments = await this.prisma.comment.findMany({
        where: {
          authorId: userId
        }
      });

      return comments;
    } catch (error: any) {
      throw error;
    }
  }

  public async editComment(commentId: string, dto: UpdateCommentDto): Promise<Comment> {
    try {
      const comment = await this.prisma.comment.findUnique({
        where: { id: commentId }
      });

      if (!comment) {
        throw new BadRequestException("Comment not found.");
      }

      const updatedComment = await this.prisma.comment.update({
        where: { id: commentId },
        data: {
          content: dto.content
        }
      });

      return updatedComment;
    } catch (error: any) {
      throw error;
    }
  }

  public async deleteComment(commentId: string): Promise<void> {
    try {
      const comment = await this.prisma.comment.findUnique({
        where: { id: commentId }
      });

      if (!comment) {
        throw new BadRequestException("Comment not found.");
      }

      await this.prisma.comment.delete({
        where: { id: commentId }
      });

    } catch (error: any) {
      throw error;
    }
  }
}
