import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserRequestDto {
    @ApiProperty()
    @IsEmail()
    @IsOptional()
    email?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    password?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    firstname?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    avatarUrl?: string;
}
