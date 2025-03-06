import { useContext } from 'react';
import { UserContext } from "@/context/user.context";

export function useUserContext() {
    return useContext(UserContext);
}