import { IsNotEmpty, IsString } from "class-validator";

export class SignUpResponseAuthDto {
    @IsString()
    @IsNotEmpty()
    message: string = "User created successfully";
}