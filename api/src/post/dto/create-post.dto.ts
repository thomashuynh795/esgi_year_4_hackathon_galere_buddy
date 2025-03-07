import { IsArray, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    title: string;

    @IsString()
    @IsOptional()
    imageUrl?: string;

    @IsString()
    @MinLength(3)
    problem: string;

    @IsString()
    @IsOptional()
    solution?: string;

    @IsString()
    @MinLength(5)
    @IsOptional()
    advice: string;

    @IsString()
    @IsOptional()
    lesson?: string;

    @IsArray()
    @IsOptional()
    tags?: string[];
}
