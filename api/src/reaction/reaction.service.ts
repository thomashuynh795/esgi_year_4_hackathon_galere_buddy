import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Reaction } from "@prisma/client";
import { CreateReactionDto } from "./dto/create-reaction.dto";
import { NotificationGateway } from "src/common/gateway/notification.gateway";

@Injectable()
export class ReactionService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly notificationGateway: NotificationGateway
  ) {}

  public async getReactionsByPostId(postId: string): Promise<Reaction[]> {
    try {
      const reactions = await this.prisma.reaction.findMany({
        where: {
          postId: postId
        }
      });

      return reactions;
    } catch (error: any) {
      throw error;
    }
  }

  public async addReaction(dto: CreateReactionDto): Promise<Reaction> {
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

      const reaction = await this.prisma.reaction.create({
        data: {
          postId: dto.postId,
          userId: dto.userId,
          react: dto.react
        }
      });

      this.notificationGateway.sendNotificationToUser(post.authorId, "Someone react to your post !");

      return reaction;
    } catch (error: any) {
      throw error;
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

      await this.prisma.reaction.delete({
        where: { id: reactionId }
      });

    } catch (error: any) {
      throw error;
    }
  }
}
