import { IsNotEmpty } from "class-validator";

export class CreateReactionDto {
  @IsNotEmpty()
  postId: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  reaction: string;
}
