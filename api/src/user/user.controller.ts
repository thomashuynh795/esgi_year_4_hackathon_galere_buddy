import { Body, Controller, Delete, Get, Patch, Res, UseGuards, Req, MaxFileSizeValidator, FileTypeValidator, ParseFilePipe, UploadedFile, UseInterceptors } from "@nestjs/common";
import { JwtGuard } from "src/auth/guard/jwt.guard";
import { UserService } from "./user.service";
import { User } from "@prisma/client";
import { Response } from "express";
import { ErrorHandlerService } from "src/common/utils/error-handler/error-handler.service";
import { UpdateUserRequestDto } from "./dto/update-user-request.dto";
import { CustomisedExpressRequest } from "src/common/models/customised-express-request";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UpdateUserResponseDto } from "./dto/update-user-response.dto";

@ApiTags("users")
@Controller("users")
export class UserController {
    public constructor(
        private readonly userService: UserService,
        private readonly errorHandlerService: ErrorHandlerService
    ) { }

    @UseGuards(JwtGuard)
    @Get("me")
    @ApiOperation({ summary: "Get the user's information" })
    @ApiResponse({ status: 200, description: "The user's information" })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({ status: 500, description: "Internal Server Error" })
    public async readMe(
        @Req() request: CustomisedExpressRequest,
        @Res() response: Response
    ): Promise<Response> {
        try {
            const user: Omit<User, "password"> =
                await this.userService.getUser(request.user.id);
            return response.status(200).json({ user });
        } catch (error: any) {
            return this.errorHandlerService.getErrorForControllerLayer(error, response);
        }
    }

    @UseGuards(JwtGuard)
    @Patch("me")
    @UseInterceptors(FileInterceptor("avatarFile"))
    @ApiOperation({ summary: "Update the user's information" })
    @ApiResponse({ status: 200, description: "The updated user's information", type: UpdateUserResponseDto })
    @ApiResponse({ status: 400, description: "Bad Request" })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({ status: 500, description: "Internal Server Error" })
    public async updateMe(
        @Req() request: CustomisedExpressRequest,
        @Body() dto: UpdateUserRequestDto,
        @Res() response: Response,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({ maxSize: 999999 }),
                    new FileTypeValidator({ fileType: /.(jpeg|jpg|png)$/ })
                ],
                fileIsRequired: false
            })
        ) avatarFile?: Express.Multer.File
    ): Promise<Response> {
        try {
            const updatedUser: Omit<User, "password"> =
                await this.userService.updateUser(request.user.id, dto, avatarFile);
            return response.status(200).json(updatedUser);
        } catch (error: any) {
            return this.errorHandlerService.getErrorForControllerLayer(error, response);
        }
    }

    @UseGuards(JwtGuard)
    @Delete("me")
    @ApiOperation({ summary: "Delete the user" })
    @ApiResponse({ status: 200, description: "The deleted user's information" })
    @ApiResponse({ status: 401, description: "Unauthorized" })
    @ApiResponse({ status: 500, description: "Internal Server Error" })
    public async deleteMe(
        @Req() request: CustomisedExpressRequest,
        @Res() response: Response
    ): Promise<Response> {
        try {
            const deletedUser: Omit<User, "password"> =
                await this.userService.deleteUser(request.user.id);
            return response.status(200).json(deletedUser);
        } catch (error: any) {
            return this.errorHandlerService.getErrorForControllerLayer(error, response);
        }
    }
}
