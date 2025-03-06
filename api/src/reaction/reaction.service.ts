import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Reaction } from "@prisma/client";
import { CreateReactionDto } from "./dto/create-reaction.dto";

@Injectable()
export class ReactionService {
  public constructor(private readonly prisma: PrismaService) {}

  public async getReactionsByPostId(postId: string): Promise<Reaction[]> {
    try {
      const reactions = await this.prisma.reaction.findMany({
        where: {
          postId: postId
        }
      });

      return reactions;
    } catch (error: any) {
      throw new InternalServerErrorException("Failed to get reactions of this post.");
    }
  }

  public async addReaction(dto: CreateReactionDto): Promise<void> {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id: dto.postId }
      });
      
      if (!post) {
        throw new BadRequestException("Post not found.");
      }

      const user = await this.prisma.user.findUnique({
        where: { id: dto.userId }
      });
      
      if (!user) {
        throw new BadRequestException("User not found.");
      }

      const existingReaction = await this.prisma.reaction.findUnique({
        where: {
          postId_userId: {
            postId: dto.postId,
            userId: dto.userId
          }
        }
      });

      if (existingReaction) {
        await this.prisma.reaction.delete({
          where: { id: existingReaction.id }
        });
      }

      await this.prisma.reaction.create({
        data: {
          postId: dto.postId,
          userId: dto.userId,
          reaction: dto.reaction
        }
      });
    } catch (error: any) {
      throw new InternalServerErrorException("Failed to add reaction.");
    }
  }

  public async deleteReaction(reactionId: string): Promise<void> {
    try {
      const reaction = await this.prisma.reaction.findUnique({
        where: { id: reactionId }
      });

      if (!reaction) {
        throw new BadRequestException("Reaction not found.");
      }

      await this.prisma.comment.delete({
        where: { id: reactionId }
      });

    } catch (error: any) {
      throw new InternalServerErrorException("Failed to delete the reaction.");
    }
  }
}
