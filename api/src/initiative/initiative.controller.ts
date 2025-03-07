import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from "@nestjs/common";
import { InitiativeService } from "./initiative.service";
import { CreateInitiativeDto } from "./dto/create-initiative.dto";
import { UpdateInitiativeDto } from "./dto/update-initiative.dto";
import { JwtAuthGuard } from "../auth/guard/jwtAuthGuard";
import { RolesGuard } from "../auth/guard/roles.guard";
import { Roles } from "../auth/decorator/roles.decorator";
import { Role } from "@prisma/client";
import {CustomisedExpressRequest} from "../common/models/customised-express-request";


@Controller("initiatives")
export class InitiativeController {
  constructor(private readonly initiativeService: InitiativeService) {}

  /**
   * Crée une nouvelle initiative
   * Uniquement accessible aux utilisateurs authentifiés
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createInitiativeDto: CreateInitiativeDto, @Req() req: CustomisedExpressRequest) {
    return this.initiativeService.create(createInitiativeDto, req.user.id);
  }

  /**
   * Récupère toutes les initiatives
   */
  @Get()
  findAll() {
    return this.initiativeService.findAll();
  }

  /**
   * Récupère une initiative spécifique par son ID
   */
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.initiativeService.findOne(id);
  }

  /**
   * Récupère toutes les initiatives liées à un post spécifique
   */
  @Get("post/:postId")
  findByPost(@Param("postId") postId: string) {
    return this.initiativeService.findByPost(postId);
  }

  /**
   * Récupère toutes les initiatives créées par un utilisateur spécifique
   */
  @Get("user/:userId")
  findByUser(@Param("userId") userId: string) {
    return this.initiativeService.findByUser(userId);
  }

  /**
   * Met à jour une initiative
   * L'utilisateur doit être authentifié
   */
  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateInitiativeDto: UpdateInitiativeDto) {
    return this.initiativeService.update(id, updateInitiativeDto);
  }

  /**
   * Met à jour le statut d'une initiative
   * L'utilisateur doit être authentifié
   */
  @UseGuards(JwtAuthGuard)
  @Patch(":id/status")
  updateStatus(@Param("id") id: string, @Body("status") status: string) {
    return this.initiativeService.updateStatus(id, status);
  }

  /**
   * Supprime une initiative
   * Seuls les administrateurs peuvent supprimer n'importe quelle initiative
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.initiativeService.delete(id);
  }
}