import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from "@nestjs/common";
import { BadgeService } from "./badge.service";
import { CreateBadgeDto } from "./dto/create-badge.dto";
import { UpdateBadgeDto } from "./dto/update-badge.dto";
import { JwtAuthGuard } from "../auth/guard/jwtAuthGuard";
import { RolesGuard } from "../auth/guard/roles.guard";
import { Roles } from "../auth/decorator/roles.decorator";
import { Role } from "@prisma/client";

@Controller("badges")
export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  /**
   * Crée un nouveau badge (réservé aux administrateurs)
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createBadgeDto: CreateBadgeDto) {
    return this.badgeService.create(createBadgeDto);
  }

  /**
   * Récupère tous les badges disponibles
   */
  @Get()
  findAll() {
    return this.badgeService.findAll();
  }

  /**
   * Récupère un badge spécifique par son ID
   */
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.badgeService.findOne(id);
  }

  /**
   * Met à jour un badge (réservé aux administrateurs)
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBadgeDto: UpdateBadgeDto) {
    return this.badgeService.update(id, updateBadgeDto);
  }

  /**
   * Supprime un badge (réservé aux administrateurs)
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.badgeService.remove(id);
  }

  /**
   * Récupère tous les badges d'un utilisateur spécifique
   */
  @Get("user/:userId")
  getUserBadges(@Param("userId") userId: string) {
    return this.badgeService.getUserBadges(userId);
  }

  /**
   * Initialise les badges par défaut (réservé aux administrateurs)
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post("initialize")
  initializeDefaultBadges() {
    return this.badgeService.initializeDefaultBadges();
  }
}