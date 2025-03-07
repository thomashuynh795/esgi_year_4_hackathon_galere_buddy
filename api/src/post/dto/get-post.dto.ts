import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class GetPostDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    authorId: string;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    createdAt: Date;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    updatedAt: Date;

    @ApiProperty()
    reactions: ReactionDto[];
}
