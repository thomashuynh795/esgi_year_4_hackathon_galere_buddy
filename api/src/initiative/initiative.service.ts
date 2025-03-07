import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateInitiativeDto } from "./dto/create-initiative.dto";
import { BadgeService } from "../badge/badge.service";
import { InitiativeStatus } from "@prisma/client";
import { UpdateInitiativeDto } from "./dto/update-initiative.dto";

@Injectable()
export class InitiativeService {
  constructor(
      private readonly prisma: PrismaService,
      private readonly badgeService: BadgeService
  ) {}

  /**
   * Crée une nouvelle initiative
   * Ajoute automatiquement le créateur comme participant
   * Attribue le badge Initiateur
   */
  async create(createInitiativeDto: CreateInitiativeDto, userId: string) {
    // Vérifier si le post existe
    const post = await this.prisma.post.findUnique({
      where: { id: createInitiativeDto.postId }
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${createInitiativeDto.postId} not found`);
    }

    // Créer l'initiative
    const initiative = await this.prisma.initiative.create({
      data: {
        title: createInitiativeDto.title,
        description: createInitiativeDto.description,
        type: createInitiativeDto.type,
        deadline: createInitiativeDto.deadline ? new Date(createInitiativeDto.deadline) : null,
        post: { connect: { id: createInitiativeDto.postId } },
        creator: { connect: { id: userId } }
      }
    });

    // Ajouter automatiquement le créateur comme participant
    await this.prisma.participant.create({
      data: {
        initiative: { connect: { id: initiative.id } },
        user: { connect: { id: userId } }
      }
    });

    // Attribuer badge et points d'initiateur
    await this.badgeService.awardInitiatorBadge(userId);

    return initiative;
  }

  /**
   * Récupère toutes les initiatives avec leurs créateurs,
   * participants et post associés
   */
  findAll() {
    return this.prisma.initiative.findMany({
      include: {
        creator: {
          select: {
            id: true,
            firstname: true,
            name: true,
            avatarUrl: true
          }
        },
        participants: {
          include: {
            user: {
              select: {
                id: true,
                firstname: true,
                name: true,
                avatarUrl: true
              }
            }
          }
        },
        post: {
          select: {
            id: true,
            title: true
          }
        }
      }
    });
  }

  /**
   * Récupère une initiative spécifique avec tous ses détails
   */
  async findOne(id: string) {
    const initiative = await this.prisma.initiative.findUnique({
      where: { id },
      include: {
        creator: true,
        participants: {
          include: {
            user: true
          }
        },
        post: true
      }
    });

    if (!initiative) {
      throw new NotFoundException(`Initiative with ID ${id} not found`);
    }

    return initiative;
  }

  /**
   * Récupère toutes les initiatives liées à un post spécifique
   */
  findByPost(postId: string) {
    return this.prisma.initiative.findMany({
      where: { postId },
      include: {
        participants: true,
        creator: {
          select: {
            id: true,
            firstname: true,
            name: true
          }
        }
      }
    });
  }

  /**
   * Récupère toutes les initiatives créées par un utilisateur spécifique
   */
  findByUser(userId: string) {
    return this.prisma.initiative.findMany({
      where: { creatorId: userId },
      include: {
        participants: true,
        post: {
          select: {
            id: true,
            title: true
          }
        }
      }
    });
  }

  /**
   * Met à jour le statut d'une initiative
   * Si l'initiative est marquée comme terminée, attribue les badges appropriés
   */
  async updateStatus(id: string, status: string) {
    // Vérifier si l'initiative existe
    const existingInitiative = await this.prisma.initiative.findUnique({
      where: { id }
    });

    if (!existingInitiative) {
      throw new NotFoundException(`Initiative with ID ${id} not found`);
    }

    const initiative = await this.prisma.initiative.update({
      where: { id },
      data: { status: status as InitiativeStatus },
      include: {
        participants: true,
        post: {
          include: {
            author: true
          }
        }
      }
    });

    // Si l'initiative est terminée, récompenser tous les participants
    if (status === InitiativeStatus.COMPLETED) {
      for (const participant of initiative.participants) {
        await this.badgeService.awardAchieverBadge(participant.userId);
      }

      // Récompense spéciale pour l'auteur du post original
      await this.badgeService.awardProblemSolverBadge(initiative.post.authorId);
    }

    return initiative;
  }

  /**
   * Supprime une initiative
   */
  async delete(id: string) {
    // Vérifier si l'initiative existe
    const initiative = await this.prisma.initiative.findUnique({
      where: { id }
    });

    if (!initiative) {
      throw new NotFoundException(`Initiative with ID ${id} not found`);
    }

    return this.prisma.initiative.delete({
      where: { id }
    });
  }

  /**
   * Met à jour une initiative
   */
  async update(id: string, updateInitiativeDto: UpdateInitiativeDto) {
    // Vérifier si l'initiative existe
    const initiative = await this.prisma.initiative.findUnique({
      where: { id }
    });

    if (!initiative) {
      throw new NotFoundException(`Initiative with ID ${id} not found`);
    }

    return this.prisma.initiative.update({
      where: { id },
      data: updateInitiativeDto
    });
  }
}