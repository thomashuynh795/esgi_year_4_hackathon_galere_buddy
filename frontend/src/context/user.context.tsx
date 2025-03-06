import { useFetch } from "@/hooks/useFetch";
import {
  createUserRequest,
} from "@/services/fetch.service";
import { IUser, NewUser } from "@/types/User";
import { LoadinSpinner } from "@/ui/molecules/LoadingSpinner/LoadingSpinner";
import { VisibilityToggle } from "@/ui/molecules/VisibilityToggle/VisibilityToggle";
import React, { ReactNode, useState } from "react";
import { open as openToast } from "@ui/organisms/Toast/Toast";

interface UserContextProps {
  users: IUser[];
  createUser: (user: NewUser) => void; 
}

export const CardContext = React.createContext<UserContextProps>({
  users: [],
  createUser: (user: NewUser) => {},
});

export function CardProvider({ children }: { children: ReactNode }) {
  const { isLoading, data, error } = useFetch<IUser[]>("cards", getUser);
  const [cards, setCards] = React.useState<ICard[]>([]);

  const isDuplicated = (user: NewUser) => {
    const founded =
      cards.filter((u) => u.question == card.question && c.answer === c.answer)
        .length > 0;
    return founded;
  };

  const createCard = async (card: NewUser) => {
    if (isDuplicated(card)) {
      openToast({
        title: "Oops",
        style: "error",
        description: "Un utilisateur au même nom existe déjà",
      });
      return;
    }

  React.useEffect(() => {
    if (!isLoading && data) {
      setCards(data);
    }
  }, [data]);

  if (error) {
    return (
      <div>Oops une erreur c'est produite. Veuillez ressayer plus tard </div>
    );
  }

  return (
    <UserContext.Provider value={{ users, createUser}}>
      <VisibilityToggle visible={!isLoading}>{children}</VisibilityToggle>
      <VisibilityToggle visible={isLoading}>
        <LoadinSpinner />
      </VisibilityToggle>
    </UserContext.Provider>
  );
}
