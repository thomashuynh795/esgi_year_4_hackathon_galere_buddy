import {IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID} from "class-validator";
import {InitiativeType} from "@prisma/client";


export class CreateInitiativeDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsEnum(InitiativeType)
    type: InitiativeType;

    @IsUUID()
    postId: string;

    @IsOptional()
    @IsDateString()
    deadline?: string;
}