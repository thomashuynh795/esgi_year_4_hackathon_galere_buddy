import { ICard, NewCard } from "@/types/Card";
import { IUser, NewUser } from "@/types/User";
import { http } from "./init.service";

export async function getCards<T>(): Promise<T> {
  return await http.get<T>("/cards");
}

export async function createUser(user: NewUser) {
  try {
    const response = await http.post<IUser>("/auth/sign-up", user);
    return response;
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    throw error;  
  }
}


export async function updateCardRequest(card: ICard) {
  return await http.put<ICard>(`/cards/${card.id}`, card);
}

export async function deleteCardRequest(id: string): Promise<{ ok: boolean }> {
  return await http.delete(`/cards/${id}`);
}

export async function getTodayQuizzRequest() {
  // const date = new Date();
  // date.setDate(10);
  // const formattedDate = date.toISOString().split("T")[0];
  return await http.get<ICard[]>(`/cards/quizz`);
}

export async function answerQuestionRequest(
  id: string,
  body: { isValid: boolean }
): Promise<{ ok: boolean }> {
  return await http.patch<ICard[]>(`/cards/${id}/answer`, body);
}
