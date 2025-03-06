import {Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards} from "@nestjs/common";

import {JwtGuard} from "../auth/guard/jwt.guard";
import {CreatePostDto} from "./dto/create-post.dto";
import {PostService} from "./post.service";
import {CustomisedExpressRequest} from "../common/models/customised-express-request";
import {UpdatePostDto} from "./dto/update-post.dto";

@Controller("post")
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Get()
    async findAll() {
        return this.postService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.postService.findOne(id);
    }

    @Get("trending")
    async findTrending() {
        return this.postService.findTrending();
    }

    @Post()
    @UseGuards(JwtGuard)
    async create(@Body() createPostDto: CreatePostDto,
                 @Req() req: CustomisedExpressRequest) {
        return this.postService.create(createPostDto,req.user.id );
    }

    @Delete(":id")
    @UseGuards(JwtGuard)
    async delete(@Param("id") id: string,
                 @Req() req: CustomisedExpressRequest) {
        return this.postService.delete(id,req.user.id);
    }

    @Patch(":id")
    @UseGuards(JwtGuard)
    async update(@Param("id") id: string,
                 @Body() updatePostDto: UpdatePostDto,
                 @Req() req: CustomisedExpressRequest) {
        return this.postService.update(id,updatePostDto,req.user.id);
    }
}
