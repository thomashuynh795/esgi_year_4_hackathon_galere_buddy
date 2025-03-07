"use client"
import React from "react"
import RegisterForm from "@ui/pages/register/RegisterForm"
import { redirect } from "next/navigation";

export default function Register(){

    if (localStorage.getItem("token")) {
      redirect("/dashboard");
    }

    return(
        <RegisterForm/>
    )
}