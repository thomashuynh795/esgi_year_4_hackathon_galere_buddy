import { useAuthContext } from "@/hooks/useContext";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default function AuthGuard({children}: {children: ReactNode}) {
    const {auth} = useAuthContext();

    if(!auth) {
        return redirect("/auth/login");
    }

    return children
}