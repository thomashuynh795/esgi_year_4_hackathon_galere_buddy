import { ICard, NewCard } from "@/types/Card";
import { IUser, NewUser } from "@/types/User";
import { http } from "./init.service";

export async function createUser(user: NewUser) {
  try {
    const response = await http.post<{jwt: string, message: string}>("/auth/sign-up", user);
    return response;
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    throw error;
  }
}

export async function modifyUser(user: NewUser) {
  try {
    const response = await http.patch<{jwt: string, message: string}>("/me", user);
    return response;
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    throw error;
  }
}