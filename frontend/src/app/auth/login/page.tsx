"use client"
import React, {useState} from "react";
import {TextField} from "@ui/atoms/Inputs/TextField/TextField";
import {Button} from "@ui/atoms/Button/Button";
import {Mail} from "@icons"
import Link from "next/link";
import {login} from "@/services/fetch.service";
import {open} from "@/ui/organisms/Toast/Toast"


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const emailRegges = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegges = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        console.log("email : ", email);
        console.log("password : ", password);
        //vérify email
        if (!emailRegges.test(email)) {
            setError("Votre email n'est pas valid");
            return;
        }

        //vérify password
        if (!passwordRegges.test(password)) {
            setError("Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial.");
            return;
        }

        //envoyer les données pour connecter l'utilisateur

        try {
            const response = await fetch(
                "http://localhost:3002/auth/log-in",
                {   method: "POST",
                    headers: {
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({email: email, password: password})
                }
            );
            if (response.ok) {
                open({
                    title: "Connexion réussie.",
                    duration: 1500,
                    description: "",
                    style: "success",

                })
            }else {
                open(
                    {
                        title: "Oops, une erreur est survenue.",
                        duration: 1500,
                        description: "",
                        style: "error"
                    }
                )
            }

        } catch (err: any) {
            console.log(err);
            setError("");

        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold text-center mb-4">Connexion</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <TextField type="email" placeholder="Adresse email" className="w-full p-2 border rounded"
                               onChange={(e) => setEmail(e.target.value)} required icon={<Mail/>}/>
                    <TextField type="password" placeholder="Mot de passe" className="w-full p-2 border rounded"
                               onChange={(e) => setPassword(e.target.value)} required/>
                    <Button type="submit" className="w-full bg-black text-white p-2 rounded" label={"Se connecter"}/>
                </form>
                <p className="text-xs mt-4">
                    Pas encore de compte ?{"   "}
                    <Link href="/register" className="text-blue-500 hover:underline text-right">Inscrivez-vous
                        ici</Link>
                </p>
            </div>
            <div className="">
                <p className="text-xs mt-4 text-xs text-gray-500">
                    @Copyright 2025 - GalèreBuddy - Tous les droits réservés.
                </p>
            </div>
        </div>
    );
}