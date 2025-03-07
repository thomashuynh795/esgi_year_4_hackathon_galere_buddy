import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Response } from "express";
import { ErrorHandlerService } from "src/common/utils/error-handler/error-handler.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SignUpRequestAuthDto } from "./dto/sign-up-request-auth.dto";
import { LogInAuthDto } from "./dto/log-in-request-auth.dto";
import { SignUpResponseAuthDto } from "./dto/sign-up-response-auth.dto";
import { AuthGuard } from "@nestjs/passport";
import { UserService } from "src/user/user.service";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "@prisma/client";
import { UpdateUserRequestDto } from "src/user/dto/update-user-request.dto";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
    public constructor(
        private readonly authService: AuthService,
        private readonly errorHandlerService: ErrorHandlerService,
        private readonly userService: UserService,
        private readonly prismaService: PrismaService
    ) { }

    @Post("sign-up")
    @ApiOperation({ summary: "Sign up" })
    @ApiResponse({ status: 201, description: "Created" })
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
    @ApiResponse({ status: 200, description: "OK", type: SignUpResponseAuthDto })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({ status: 500, description: "Internal Server Error" })
    public async logIn(
        @Body() dto: LogInAuthDto,
        @Res() response: Response
    ): Promise<Response> {
        try {
            const jwt: string = await this.authService.logIn(dto);
            return response.status(HttpStatus.OK).json({ jwt, message: "Log in successful" });
        } catch (error: any) {
            return this.errorHandlerService.getErrorForControllerLayer(error, response);
        }
    }

    @Get("google")
    @UseGuards(AuthGuard("google"))
    async googleLogin() {
    }

    @Get("google/callback")
    @UseGuards(AuthGuard("google"))
    async googleAuthRedirect(@Req() req) {
        console.log(req.user);
        const foundUser: User = await this.prismaService.user.findUnique({
            where: { email: req.user.email }
        });
        const dto: UpdateUserRequestDto = {
            email: req.user.email,
            firstname: req.user.firstName,
            name: req.user.lastName,
            avatarUrl: req.user.picture
        };
        const user = this.userService.updateUser(foundUser.id, dto, null);
        return {
            message: "User Info from Google",
            user
        };
    }

}
