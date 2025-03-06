import {Injectable, NotFoundException} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.post.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        avatarUrl: true
                    }
                },
                tags: {
                    include: {
                        tag: true
                    }
                },
                _count: {
                    select: {
                        comments: true,
                        likes: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    }

    async findOne(id: string) {
        const post = await this.prisma.post.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        avatarUrl: true
                    }
                },
                tags: {
                    include: {
                        tag: true
                    }
                },
                comments: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                name: true,
                                avatarUrl: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true
                    }
                }
            }
        });

        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }

        return post;
    }

    async create(createPostDto: CreatePostDto, authorId: string) {
        const {tags, ...postData } = createPostDto;

        return this.prisma.post.create({
            data: {
                ...postData,
                authorId,
                ...(tags && tags.length > 0
                    ? {
                        tags: {
                            create: tags.map((tagId) => ({
                                tag: {
                                    connect: { id: tagId }
                                }
                            }))
                        }
                    }
                    : {})
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        avatarUrl: true
                    }
                },
                tags: {
                    include: {
                        tag: true
                    }
                }
            }
        });
    }

    async update(id: string, updatePostDto: UpdatePostDto, userId: string) {

        const post = await this.prisma.post.findUnique({
            where: { id },
            select: { authorId: true }
        });

        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }

        if (post.authorId !== userId) {
            throw new Error("You are not authorized to update this post");
        }

        const { tags: tags, ...postData } = updatePostDto;

        // Mise à jour du post
        return this.prisma.post.update({
            where: { id },
            data: {
                ...postData,
                ...(tags
                    ? {
                        tags: {
                            deleteMany: {}, // Supprimer les anciens tags
                            create: tags.map((tagId) => ({
                                tag: {
                                    connect: { id: tagId }
                                }
                            }))
                        }
                    }
                    : {})
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        avatarUrl: true
                    }
                },
                tags: {
                    include: {
                        tag: true
                    }
                }
            }
        });
    }

    async delete(id: string, userId: string) {
        // Vérifier que le post existe et appartient à l'utilisateur
        const post = await this.prisma.post.findUnique({
            where: { id },
            select: { authorId: true }
        });

        if (!post) {
            throw new NotFoundException(`Post with ID ${id} not found`);
        }

        if (post.authorId !== userId) {
            throw new Error("You are not authorized to delete this post");
        }

        return this.prisma.post.delete({
            where: { id }
        });
    }

    async findTrending() {
        // Récupérer les posts avec le plus de likes/commentaires sur les 7 derniers jours
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        return this.prisma.post.findMany({
            where: {
                createdAt: {
                    gte: sevenDaysAgo
                }
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        avatarUrl: true
                    }
                },
                tags: {
                    include: {
                        tag: true
                    }
                },
                _count: {
                    select: {
                        comments: true,
                        likes: true
                    }
                }
            },
            orderBy: [
                {
                    likes: {
                        _count: "desc"
                    }
                },
                {
                    comments: {
                        _count: "desc"
                    }
                }
            ],
            take: 10
        });
    }
}
