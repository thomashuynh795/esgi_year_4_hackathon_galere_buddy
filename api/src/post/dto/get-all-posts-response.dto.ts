import { ApiProperty } from "@nestjs/swagger";

export class GetAllPostsResponseDto {
    @ApiProperty({ type: [PostDto] })
    public posts: PostDto[];
}

export class PostDto {
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public title: string;

    @ApiProperty()
    public content: string;

    @ApiProperty()
    public author: UserDto;

    @ApiProperty()
    public createdAt: Date;

    @ApiProperty()
    public updatedAt: Date;

    @ApiProperty()
    public comments: CommentDto[];

    @ApiProperty()
    public reactions: ReactionDto[];
}
