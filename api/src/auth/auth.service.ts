import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { hash, compare } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { SignUpRequestAuthDto } from "./dto/sign-up-request-auth.dto";
import { LogInRequestAuthDto } from "./dto/log-in-request-auth.dto";

@Injectable()
export class AuthService {
    public constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService
    ) { }

    public async signUp(
        dto: SignUpRequestAuthDto
    ): Promise<string> {
        const hashedPassword: string = await hash(dto.password, 10);
        const data = {
            email: dto.email,
            password: hashedPassword,
            firstname: dto.firstname,
            name: dto.name,
            avatarUrl: "https://esgi-year-4-hackathon-galere-buddy.s3.eu-west-3.amazonaws.com/default_profile_picture.png"
        };
        const user: Partial<User> = await this.prisma.user.create({
            data,
            select: {
                id: true,
                email: true
            }
        });

        if (!user) {
            throw new InternalServerErrorException("User creation failed.");
        }

        return await this.jwtService.signAsync({
            sub: user.id
        });
    }

    public async logIn(
        dto: LogInRequestAuthDto
    ): Promise<string> {
        const user: User = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });

        if (!user || !await compare(dto.password, user.password)) {
            throw new BadRequestException("Credentials are not valid.");
        }

        return await this.jwtService.signAsync({
            sub: user.id
        });
    }
}
