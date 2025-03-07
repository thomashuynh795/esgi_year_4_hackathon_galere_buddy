import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { UserModule } from "src/user/user.module";
import { PassportModule } from "@nestjs/passport";
import { GoogleStrategy } from "./strategy/google.strategy";

@Module({
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
        GoogleStrategy
    ],
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>("JWT_SECRET"),
                signOptions: { expiresIn: "100y" }
            })
        }),
        UserModule,
        PassportModule.register({ defaultStrategy: "jwt" })
    ],
    exports: [
        AuthService,
        PassportModule
    ]
})
export class AuthModule { }
