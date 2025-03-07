import { NewUser } from "@/types/User";
import { http } from "./init.service";
import { IPost, NewPost } from "@/types/Post";

export async function createUser(user: NewUser) {
  try {
    const response = await http.post<{jwt: string, message: string}>("/auth/sign-up", user);
    return response;
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    throw error;
  }
}


export async function getAllPost() {
  return await http.get<IPost[]>( "/post");
}


export async function createPost(post: NewPost) {
  return await http.post<{ jwt: string; message: string }>("/post", post, true);
}


export async function loginUserRequest(data: {email: string, password: string}) {
  try {
    const response = await http.post<{ jwt: string; message: string }>(
      "/auth/log-in",
      data
    );
    return response;
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    throw error;
  }
}
