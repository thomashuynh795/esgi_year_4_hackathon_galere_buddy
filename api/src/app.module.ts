import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { CommonModule } from "./common/common.module";
import { ConfigModule } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";
import { AwsS3Module } from "./aws-s3/aws-s3.module";
import { ReactionModule } from "./reaction/reaction.module";
import { MulterModule } from "@nestjs/platform-express";
import { PostModule } from "./post/post.module";
import { CommentModule } from "./comment/comment.module";
import { NotificationGateway } from "./common/gateway/notification.gateway";
import { BookmarkModule } from "./bookmark/bookmark.module";
import { TagModule } from "./tag/tag.module";
@Module({
    imports: [
        AuthModule,
        UserModule,
        PrismaModule,
        CommonModule,
        ConfigModule.forRoot({
            isGlobal: true
        }),
        ScheduleModule.forRoot(),
        ReactionModule,
        AwsS3Module,
        MulterModule.register({
            limits: { fileSize: 1000000 },
            dest: "./uploads"
        }),
        PostModule,
        CommentModule,
        TagModule,
        BookmarkModule
    ],
    controllers: [],
    providers: [NotificationGateway]
})
export class AppModule { }
