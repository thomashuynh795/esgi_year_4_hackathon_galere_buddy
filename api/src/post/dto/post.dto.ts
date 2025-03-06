import { ApiProperty } from "@nestjs/swagger";
import { Reaction } from "src/reaction/entities/reaction.entity";

export class PostDtoInList {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    content: string;

    @ApiProperty()
    authorId: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    reactions: Reaction[];
}
