import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { BadgeType } from "@prisma/client";

export class CreateBadgeDto {
    @IsEnum(BadgeType)
    type: BadgeType;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    imageUrl: string;
}
