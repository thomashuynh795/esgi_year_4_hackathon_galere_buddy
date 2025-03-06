import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBookmarkDto } from "./dto/create-bookmark.dto";
import { Bookmark } from "@prisma/client";

@Injectable()
export class BookmarkService {
  public constructor(private readonly prisma: PrismaService) {}

  public async createBookmark(dto: CreateBookmarkDto): Promise<Bookmark> {
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

      const bookmark = await this.prisma.bookmark.create({
        data: {
          postId: dto.postId,
          userId: dto.userId
        }
      });

      return bookmark;
    } catch (error: any) {
      throw error;
    }
  }

  public async deleteBookmark(bookmarkId: string): Promise<void> {
    try {
      const bookmark = await this.prisma.bookmark.findUnique({
        where: { id: bookmarkId }
      });

      if (!bookmark) {
        throw new BadRequestException("Bookmark not found.");
      }

      await this.prisma.bookmark.delete({
        where: { id: bookmarkId }
      });
    } catch (error: any) {
      throw error;
    }
  }

  public async getBookmarksByUserId(userId: string): Promise<Bookmark[]> {
    try {
      return await this.prisma.bookmark.findMany({
        where: { userId }
      });
    } catch (error: any) {
      throw error;
    }
  }
}
