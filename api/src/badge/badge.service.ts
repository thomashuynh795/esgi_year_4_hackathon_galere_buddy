import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { BadgeType } from "@prisma/client";
import { CreateBadgeDto } from "./dto/create-badge.dto";
import { UpdateBadgeDto } from "./dto/update-badge.dto";

@Injectable()
export class BadgeService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Crée un nouveau badge
   */
  async create(createBadgeDto: CreateBadgeDto) {
    return this.prisma.badge.create({
      data: createBadgeDto
    });
  }

  /**
   * Récupère tous les badges
   */
  async findAll() {
    return this.prisma.badge.findMany();
  }

  /**
   * Récupère un badge par son ID
   */
  async findOne(id: string) {
    const badge = await this.prisma.badge.findUnique({
      where: { id }
    });

    if (!badge) {
      throw new NotFoundException(`Badge with ID ${id} not found`);
    }

    return badge;
  }

  /**
   * Met à jour un badge
   */
  async update(id: string, updateBadgeDto: UpdateBadgeDto) {
    return this.prisma.badge.update({
      where: { id },
      data: updateBadgeDto
    });
  }

  /**
   * Supprime un badge
   */
  async remove(id: string) {
    return this.prisma.badge.delete({
      where: { id }
    });
  }

  /**
   * Initialise les badges par défaut du système
   */
  async initializeDefaultBadges() {
    const defaultBadges = [
      {
        type: BadgeType.INITIATOR,
        name: "Initiateur",
        description: "A lancé une initiative collaborative",
        imageUrl: "/badges/initiator.png"
      },
      {
        type: BadgeType.COLLABORATOR,
        name: "Collaborateur",
        description: "A participé à une initiative collaborative",
        imageUrl: "/badges/collaborator.png"
      },
      {
        type: BadgeType.ACHIEVER,
        name: "Achiever",
        description: "A complété une initiative collaborative",
        imageUrl: "/badges/achiever.png"
      },
      {
        type: BadgeType.PROBLEM_SOLVER,
        name: "Problem Solver",
        description: "Son post a inspiré une initiative réussie",
        imageUrl: "/badges/problem_solver.png"
      }
    ];

    // Créer les badges s'ils n'existent pas déjà
    const results = [];
    for (const badgeData of defaultBadges) {
      const badge = await this.findOrCreateBadge(
          badgeData.type,
          badgeData.name,
          badgeData.description,
          badgeData.imageUrl
      );
      results.push(badge);
    }

    return results;
  }

  /**
   * Méthode utilitaire pour trouver ou créer un badge
   */
  private async findOrCreateBadge(type: BadgeType, name: string, description: string, imageUrl: string) {
    let badge = await this.prisma.badge.findFirst({ where: { type } });

    if (!badge) {
      badge = await this.prisma.badge.create({
        data: { type, name, description, imageUrl }
      });
    }

    return badge;
  }

  /**
   * Attribue un badge à un utilisateur
   */
  private async awardBadgeToUser(userId: string, badgeId: string) {
    // Vérifier si l'utilisateur a déjà ce badge
    const existingUserBadge = await this.prisma.userBadge.findUnique({
      where: {
        userId_badgeId: {
          userId,
          badgeId
        }
      }
    });

    if (!existingUserBadge) {
      await this.prisma.userBadge.create({
        data: {
          user: { connect: { id: userId } },
          badge: { connect: { id: badgeId } }
        }
      });
    }
  }

  /**
   * Ajoute des points d'impact à un utilisateur
   */
  async addImpactPoints(userId: string, points: number) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        impactPoints: {
          increment: points
        }
      }
    });
  }

  /**
   * Attribue le badge Initiateur
   */
  async awardInitiatorBadge(userId: string) {
    const badge = await this.findOrCreateBadge(
        BadgeType.INITIATOR,
        "Initiateur",
        "A lancé une initiative collaborative",
        "/badges/initiator.png"
    );

    await this.awardBadgeToUser(userId, badge.id);
    await this.addImpactPoints(userId, 15);
  }

  /**
   * Attribue le badge Collaborateur
   */
  async awardCollaboratorBadge(userId: string) {
    const badge = await this.findOrCreateBadge(
        BadgeType.COLLABORATOR,
        "Collaborateur",
        "A participé à une initiative collaborative",
        "/badges/collaborator.png"
    );

    await this.awardBadgeToUser(userId, badge.id);
    await this.addImpactPoints(userId, 5);
  }

  /**
   * Attribue le badge Achiever
   */
  async awardAchieverBadge(userId: string) {
    const badge = await this.findOrCreateBadge(
        BadgeType.ACHIEVER,
        "Achiever",
        "A complété une initiative collaborative",
        "/badges/achiever.png"
    );

    await this.awardBadgeToUser(userId, badge.id);
    await this.addImpactPoints(userId, 20);
  }

  /**
   * Attribue le badge ProblemSolver
   */
  async awardProblemSolverBadge(userId: string) {
    const badge = await this.findOrCreateBadge(
        BadgeType.PROBLEM_SOLVER,
        "Problem Solver",
        "Son post a inspiré une initiative réussie",
        "/badges/problem_solver.png"
    );

    await this.awardBadgeToUser(userId, badge.id);
    await this.addImpactPoints(userId, 30);
  }

  /**
   * Récupère tous les badges d'un utilisateur
   */
  async getUserBadges(userId: string) {
    return this.prisma.userBadge.findMany({
      where: { userId },
      include: {
        badge: true
      }
    });
  }
}