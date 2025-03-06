import {TagController} from "./tag.controller";
import {TagService} from "../../dist/src/tag/tag.service";
import {Module} from "@nestjs/common";

@Module({
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule {}
