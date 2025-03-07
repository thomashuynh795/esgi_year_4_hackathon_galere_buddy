import {IsDateString, IsEnum, IsOptional, IsString} from "class-validator";
import {InitiativeType} from "@prisma/client";

export class UpdateInitiativeDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(InitiativeType)
    @IsOptional()
    type?: InitiativeType;

    @IsDateString()
    @IsOptional()
    deadline?: string;

    @IsString()
    @IsOptional()
    outcome?: string;
}
