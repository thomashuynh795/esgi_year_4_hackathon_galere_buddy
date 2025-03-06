"use client"
import React from "react"
import { TextField } from "@/ui/atoms/Inputs/TextField/TextField"
import { Button } from "@/ui/atoms/Button/Button"
import { Stack } from "@/ui/layouts/Stack/Stack"
import { Mail } from "lucide-react"

export default function RegisterForm(){
    return(
        <>           
            <div className="p-[48px] max-w-[445px] m-auto">
                <h2 className="font-bold">GalèreBuddy</h2>
                <p>Partagez vos anecdotes</p>
                <form className="mt-5 p-5 border rounded-md">
                    <p>Je crée mon profil en quelques étapes</p>
                    <Stack className="mt-5" direction={"col"} gapy={5}>
                        <span className="flex">
                            <TextField type={"text"} placeholder="Nom" required/>
                            <TextField type={"text"}  placeholder="Prénom" required/>
                        </span>
                        <TextField type={"email"}  placeholder="Adresse email" icon={<Mail/>} required/>
                        <TextField type={"password"}  placeholder="Mot de passe" required/>
                        <Button className="py-3 mt-5" label={"Suivant"} type="submit"/>
                    </Stack>
                    <p>Me créer un compte</p>
                </form>
            </div>
        </>
    )
}