"use client";
import React from "react";
import { TextField } from "@/ui/atoms/Inputs/TextField/TextField";
import { Button } from "@/ui/atoms/Button/Button";
import { Stack } from "@/ui/layouts/Stack/Stack";
import { Mail } from "lucide-react";

interface FirstRegisterFormProps {
  onSuccess: () => void;
  formData: {
    nom: string;
    prenom: string;
    email: string;
    password: string;
    profilePicture:string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      nom: string;
      prenom: string;
      email: string;
      password: string;
      profilePicture: string;
    }>
  >;
}

export default function FirstRegisterForm({
  onSuccess,
  formData,
  setFormData,
}: FirstRegisterFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const inputs = document.querySelectorAll(
      "input[required]"
    ) as NodeListOf<HTMLInputElement>;

    let allValid = true;
    inputs.forEach((input) => {
      if (!input.reportValidity()) {
        allValid = false;
      }
    });

    if (!allValid) return;

    console.log("Première étape validée !");
    onSuccess();
  };

  return (
    <Stack className="mt-5 p-5" direction={"col"} gapy={5}>
      <span className="flex">
        <TextField
          type="text"
          placeholder="Nom"
          name="nom"
          value={formData.nom || ""}
          onChange={handleChange}
          required
        />
        <TextField
          type="text"
          placeholder="Prénom"
          name="prenom"
          value={formData.prenom || ""}
          onChange={handleChange}
          required
        />
      </span>
      <TextField
        type="email"
        placeholder="Adresse email"
        name="email"
        value={formData.email || ""}
        onChange={handleChange}
        icon={<Mail />}
        required
      />
      <TextField
        type="password"
        placeholder="Mot de passe"
        name="password"
        value={formData.password || ""}
        onChange={handleChange}
        required
      />
      <Button
        className="py-3 mt-5"
        label="Suivant"
        type="button"
        onClick={handleSubmit}
      />
    </Stack>
  );
}
