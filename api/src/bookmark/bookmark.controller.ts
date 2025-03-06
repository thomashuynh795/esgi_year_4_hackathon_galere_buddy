import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res, UseGuards } from "@nestjs/common";
import { BookmarkService } from "./bookmark.service";
import { ErrorHandlerService } from "src/common/utils/error-handler/error-handler.service";
import { JwtGuard } from "src/auth/guard/jwt.guard";
import { RolesGuard } from "src/auth/guard/roles.guard";
import { Roles } from "src/auth/decorator/roles.decorator";
import { Role } from "@prisma/client";
import { Response } from "express";
import { CreateBookmarkDto } from "./dto/create-bookmark.dto";

@Controller("bookmarks")
export class BookmarkController {
    constructor(
        private readonly bookmarkService: BookmarkService,
        private readonly errorHandlerService: ErrorHandlerService
    ) { }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.MEMBER)
    @Get(":userId")
    public async getBookmarksOfUser(
      @Param("userId") userId: string,
      @Res() response: Response
    ): Promise<Response> {
      try {
        const bookmarks = await this.bookmarkService.getBookmarksByUserId(userId);

        return response
            .status(HttpStatus.OK)
            .json(bookmarks);
      } catch (error: any) {
          return this.errorHandlerService
          .getErrorForControllerLayer(
              error,
              response
          );
      }
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.MEMBER)
    @Post()
    public async addBookmark(
      @Body() createBookmarkDto: CreateBookmarkDto,
      @Res() response: Response
    ): Promise<Response> {
      try {
        const bookmark = await this.bookmarkService.createBookmark(createBookmarkDto);

        return response
            .status(HttpStatus.CREATED)
            .json(bookmark);
      } catch (error: any) {
          return this.errorHandlerService
          .getErrorForControllerLayer(
              error,
              response
          );
      }
    }

    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.MEMBER)
    @Delete(":bookmarkId")
    public async deleteBookmark(
      @Param("bookmarkId") bookmarkId: string,
      @Res() response: Response
    ): Promise<Response> {
      try {
        await this.bookmarkService.deleteBookmark(bookmarkId);

        return response
            .status(HttpStatus.NO_CONTENT) 
            .json();
      } catch (error: any) {
        return this.errorHandlerService
        .getErrorForControllerLayer(
            error,
            response
        );
      }
    }
}
