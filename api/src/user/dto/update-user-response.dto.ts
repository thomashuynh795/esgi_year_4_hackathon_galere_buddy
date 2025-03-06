import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UpdateUserResponseDto {
    @IsUUID()
    @ApiProperty()
    @IsNotEmpty()
    id: number;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    avatarUrl: string;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    createdAt: Date;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    updatedAt: Date;
}
