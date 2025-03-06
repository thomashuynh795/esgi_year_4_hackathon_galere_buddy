"use client";
import React, { useState } from "react";
import FirstRegisterForm from "./FirstRegisterForm";
import SecondRegisterForm from "./SecondRegisterForm";

export default function RegisterForm() {
  const [step, setStep] = useState(1);

   const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    profilePicture:"/img/profilePicture.png"
  });

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <span className="flex flex-col items-center text-center">
        <h2 className="font-bold">GalèreBuddy</h2>
        <p>Partagez vos anecdotes</p>
      </span>

      <div className="flex items-center justify-center w-full">
        <form className="mt-5 p-5 border border-gray-300 rounded-md">
          <p className="text-center">Je crée mon profil en quelques étapes</p>

           {step === 1 && (
            <FirstRegisterForm
              onSuccess={() => setStep(2)}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {step === 2 && <SecondRegisterForm goBack={() => setStep(1)} />}

          <p className="text-center">Me créer un compte</p>
        </form>
      </div>

      <p className="mt-5 text-center mx-auto">
        Copyright 2025 GalèreBuddy. Tous les droits réservés
      </p>
    </div>
  );
}
