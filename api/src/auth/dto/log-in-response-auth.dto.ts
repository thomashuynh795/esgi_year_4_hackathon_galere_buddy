import { ApiProperty } from "@nestjs/swagger";

export class LogInResponseAuthDto {
    @ApiProperty()
    token: string;

    @ApiProperty()
    message: string;
}
