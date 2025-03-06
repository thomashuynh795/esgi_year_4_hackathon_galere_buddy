import { IsNotEmpty } from "class-validator";

export class CreateBookmarkDto {
  @IsNotEmpty()
  postId: string;

  @IsNotEmpty()
  userId: string;
}
