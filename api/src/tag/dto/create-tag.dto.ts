import {IsNotEmpty, IsString, MinLength} from "class-validator";

export class CreateTagDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;
}
