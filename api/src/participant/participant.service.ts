import {ConflictException, Injectable, NotFoundException} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {BadgeService} from "../badge/badge.service";

@Injectable()
export class ParticipantService {
  constructor(
      private readonly prisma: PrismaService,
      private readonly badgeService: BadgeService
  ) {}

  //Voir la liste de participant d'une initiative
  async getParticipants(initiativeId: string) {
    return this.prisma.participant.findMany({
      where: { initiativeId },
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
    });
  }

  async join(initiativeId: string, userId: string) {
    // Vérifier si l'initiative existe
    const initiative = await this.prisma.initiative.findUnique({
      where: { id: initiativeId }
    });

    if (!initiative) {
      throw new NotFoundException(`Initiative with ID ${initiativeId} not found`);
    }

    // Vérifier si l'utilisateur est déjà participant
    const existingParticipant = await this.prisma.participant.findUnique({
      where: {
        initiativeId_userId: {
          initiativeId,
          userId
        }
      }
    });

    if (existingParticipant) {
      throw new ConflictException("User is already a participant of this initiative");
    }

    // Ajouter l'utilisateur comme participant
    const participant = await this.prisma.participant.create({
      data: {
        initiative: { connect: { id: initiativeId } },
        user: { connect: { id: userId } }
      }
    });

    // Attribuer badge et points de collaborateur
    await this.badgeService.awardCollaboratorBadge(userId);

    return participant;
  }

  async leave(initiativeId: string, userId: string) {
    // Vérifier si la participation existe
    const participant = await this.prisma.participant.findUnique({
      where: {
        initiativeId_userId: {
          initiativeId,
          userId
        }
      }
    });

    if (!participant) {
      throw new NotFoundException("User is not a participant of this initiative");
    }

    // Supprimer la participation
    return this.prisma.participant.delete({
      where: {
        initiativeId_userId: {
          initiativeId,
          userId
        }
      }
    });
  }
}
