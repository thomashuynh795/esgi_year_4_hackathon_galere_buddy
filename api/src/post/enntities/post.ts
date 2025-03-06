import { Reaction } from "src/reaction/entities/reaction.entity";
import { User } from "src/user/entities/user.entity";

export class Post {
    id: string;
    title: string;
    content: string;
    author: User;
    createdAt: Date;
    updatedAt: Date;
    comments: Comment[];
    reactions: Reaction[];
}
