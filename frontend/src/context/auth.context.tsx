"use client";

import { redirect } from "next/navigation";
import React, { ReactElement, ReactNode } from "react";


interface ContextProps {
  children: ReactNode
}

export const AuthContext = React.createContext({
  login: (data: { token: string }) => {},
  register: (data: { token: string }) => {},
  auth: null
});


export default function AuthProvider(props: ContextProps)
 { 
  const {children} = props;
  const token = window.localStorage.getItem("token");


  const login = (data: {token: string}) => {
    window.localStorage.setItem("token", data.token);
    redirect("/dashboard");
  }

  const register = (data: { token: string }) => {
    window.localStorage.setItem("token", data.token);
    redirect("/dashboard");
  };


  const logout = () => {
    localStorage.removeItem("token");
  }
  return <AuthContext.Provider value={{login, register, auth: token}}>
    {children}
  </AuthContext.Provider>
}