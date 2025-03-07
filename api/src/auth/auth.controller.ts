import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { ErrorHandlerService } from "src/common/utils/error-handler/error-handler.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SignUpRequestAuthDto } from "./dto/sign-up-request-auth.dto";
import { LogInRequestAuthDto } from "./dto/log-in-request-auth.dto";
import { SignUpResponseAuthDto } from "./dto/sign-up-response-auth.dto";
import { LogInResponseAuthDto } from "./dto/log-in-response-auth.dto";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
    public constructor(
        private readonly authService: AuthService,
        private readonly errorHandlerService: ErrorHandlerService
    ) { }

    @Post("sign-up")
    @ApiOperation({ summary: "Sign up" })
    @ApiResponse({ status: 201, description: "Created", type: SignUpResponseAuthDto })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({ status: 500, description: "Internal Server Error" })
    public async signUp(
        @Body() dto: SignUpRequestAuthDto,
        @Res() response: Response
    ): Promise<Response> {
        try {
            const jwt = await this.authService.signUp(dto);
            return response.status(HttpStatus.CREATED).json({ jwt, message: "Sign up successful" });
        } catch (error: any) {
            return this.errorHandlerService.getErrorForControllerLayer(error, response);
        }
    }

    @Post("log-in")
    @ApiOperation({ summary: "Log in" })
    @ApiResponse({ status: 200, description: "OK", type: LogInResponseAuthDto })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({ status: 500, description: "Internal Server Error" })
    public async logIn(
        @Body() dto: LogInRequestAuthDto,
        @Res() response: Response
    ): Promise<Response> {
        try {
            const jwt: string = await this.authService.logIn(dto);
            return response.status(HttpStatus.OK).json({ jwt, message: "Log in successful" });
        } catch (error: any) {
            return this.errorHandlerService.getErrorForControllerLayer(error, response);
        }
    }
}
