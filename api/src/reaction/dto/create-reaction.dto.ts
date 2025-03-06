import { IsEnum, IsNotEmpty } from "class-validator";
import { React } from "@prisma/client";

export class CreateReactionDto {
  @IsNotEmpty()
  postId: string;

  @IsNotEmpty()
  userId: string;

  @IsEnum(React)
  @IsNotEmpty()
  react: React;
}
