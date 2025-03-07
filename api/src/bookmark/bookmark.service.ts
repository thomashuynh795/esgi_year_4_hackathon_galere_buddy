import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Bookmark } from "@prisma/client";

@Injectable()
export class BookmarkService {
  public constructor(private readonly prisma: PrismaService) {}

  public async createBookmark(postId: string, userId: string): Promise<Bookmark> {
    // Vérifier que le post existe
    const post = await this.prisma.post.findUnique({
      where: { id: postId }
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    // Vérifier si le bookmark existe déjà
    const existingBookmark = await this.prisma.bookmark.findFirst({
      where: {
        postId,
        userId
      }
    });

    if (existingBookmark) {
      throw new ConflictException("This post is already bookmarked");
    }

    // Créer le bookmark
    try {
      return await this.prisma.bookmark.create({
        data: {
          postId,
          userId
        },
        include: {
          post: {
            select: {
              title: true,
              imageUrl: true
            }
          }
        }
      });
    } catch (error) {
      throw new BadRequestException(`Failed to create bookmark: ${error.message}`);
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
