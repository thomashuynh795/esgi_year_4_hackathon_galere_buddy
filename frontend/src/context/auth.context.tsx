import { redirect } from "next/navigation";
import React, { ReactElement } from "react";


interface ContextProps {
children: ReactElement
login: (data: {token: string}) => {}
}

export const AuthContext = React.createContext({
  login: (data: { token: string }) => {},
});


export default function AuthProvider(props: ContextProps)
 { 
  const {children} = props;

  const login = (data: {token: string}) => {
    localStorage.setItem("token", data.token);
    redirect("/dashboard");
  }


  return <AuthContext.Provider value={{login}}>
    {children}
  </AuthContext.Provider>
}