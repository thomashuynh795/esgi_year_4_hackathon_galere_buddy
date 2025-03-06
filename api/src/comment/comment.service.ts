import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Comment } from "@prisma/client";

@Injectable()
export class CommentService {
  public constructor(private readonly prisma: PrismaService) {}

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

      return comment;
    } catch (error: any) {
      throw new InternalServerErrorException("Failed to create comment.");
    }
  }

  public async getCommentsByPostId(postId: string): Promise<Comment[]> {
    try {
      const comments = await this.prisma.comment.findMany({
        where: {
          postId: postId
        }
      });

      if (!comments || comments.length === 0) {
        throw new BadRequestException("No comments found for this post.");
      }

      return comments;
    } catch (error: any) {
      throw new InternalServerErrorException("Failed to get comments of this post.");
    }
  }

  public async getCommentsByUserId(userId: string): Promise<Comment[]> {
    try {
      const comments = await this.prisma.comment.findMany({
        where: {
          authorId: userId
        }
      });

      if (!comments || comments.length === 0) {
        throw new BadRequestException("No comments found for this user.");
      }

      return comments;
    } catch (error: any) {
      throw new InternalServerErrorException("Failed to get comments of this user.");
    }
  }

  public async editComment(commentId: string, newContent: string): Promise<Comment> {
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
          content: newContent
        }
      });

      return updatedComment;
    } catch (error: any) {
      throw new InternalServerErrorException("Failed to edit the comment.");
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
      throw new InternalServerErrorException("Failed to delete the comment.");
    }
  }
}
