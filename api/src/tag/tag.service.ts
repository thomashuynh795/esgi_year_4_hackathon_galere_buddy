import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.tag.findMany({
      include: {
        _count: {
          select: {
            posts: true
          }
        }
      },
      orderBy: {
        posts: {
          _count: "desc"
        }
      }
    });
  }

  async findOne(id: string) {
    return this.prisma.tag.findUnique({
      where: { id },
      include: {
        posts: {
          include: {
            post: {
              include: {
                author: {
                  select: {
                    id: true,
                    name: true,
                    avatarUrl: true
                  }
                }
              }
            }
          }
        }
      }
    });
  }

  async create(name: string) {
    return this.prisma.tag.create({
      data: { name }
    });
  }
}