import {TagController} from "./tag.controller";
import {TagService} from "./tag.service";
import {Module} from "@nestjs/common";

@Module({
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule {}
