import { ICard, NewCard } from "@/types/Card";
import { IUser, NewUser } from "@/types/User";
import { http } from "./init.service";


/*
export async function login(email: string, password: string): Promise<{ jwt: string; message: string; ok: boolean }> {
    try {
        // Effectue la requête
        const response = await http.post(`/auth/log-in`, { email, password });

        // Convertit la réponse en JSON
        const data = await response.json(); // Ajouté ici

        console.log("Login fetch response:", data);

        // Déstructuration après conversion en JSON
        const { jwt, message, ok } = data;

        // Vérifie si l'authentification est réussie
        if (ok) {
            return { jwt, message, ok }; // Retourne directement l'objet destructuré
        } else {
            throw new Error(message || "Erreur inconnue lors de la connexion.");
        }
    } catch (error: any) {
        console.error("Erreur de connexion:", error);
        throw new Error(error.message || "Problème lors de la connexion.");
    }
}
*/





/*
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
*/

/*
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

 */
