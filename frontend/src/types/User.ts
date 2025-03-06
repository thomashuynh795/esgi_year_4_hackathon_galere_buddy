export interface IUser {
    id: string
    name: string;
    firstname: string;
    email: string;
    password: string;
    profilePicture:string;
}

export type NewUser = Omit<IUser, "id">;