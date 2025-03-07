import {JwtAuthGuard} from "../auth/guard/jwtAuthGuard";
import {CustomisedExpressRequest} from "../common/models/customised-express-request";
import {Body, Controller, Delete, Get, Param, Post, Req, UseGuards} from "@nestjs/common";
import {CreateParticipantDto} from "./dto/create-participant.dto";
import {ParticipantService} from "./participant.service";

@Controller("participant")
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  join(@Body() createParticipantDto: CreateParticipantDto, @Req() req: CustomisedExpressRequest) {
    return this.participantService.join(createParticipantDto.initiativeId, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":initiativeId")
  leave(@Param("initiativeId") initiativeId: string, @Req() req: CustomisedExpressRequest) {
    return this.participantService.leave(initiativeId, req.user.id);
  }

    @Get(":initiativeId")
    getParticipants(@Param("initiativeId") initiativeId: string) {
        return this.participantService.getParticipants(initiativeId);
    }
}
