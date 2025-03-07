import {IsNotEmpty, IsUUID} from "class-validator";

export class CreateParticipantDto {
    @IsUUID()
    @IsNotEmpty()
    initiativeId: string;
}
