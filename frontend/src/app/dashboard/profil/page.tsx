"use client";
import React, { useState } from "react";
import { TextField } from "@/ui/atoms/Inputs/TextField/TextField";
import { Button } from "@/ui/atoms/Button/Button";
import { Stack } from "@/ui/layouts/Stack/Stack";
import { Mail } from "lucide-react";
import { open as openToast } from "@ui/organisms/Toast/Toast";

interface FormDataInterface {
  name: string;
  firstname: string;
  email: string;
  password: string;
  profilePicture: string;
}

export default function Profil() {
  const [formData, setFormData] = useState<FormDataInterface>({
    name: "",
    firstname: "",
    email: "",
    password: "",
    profilePicture: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(formData);
    const res: { jwt: string; message: string } = await modifyUser(formData);

    openToast({
      title: "Success",
      description: "Modification prise en compte",
      style: "success",
    });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Stack className="mt-5 p-5" direction={"col"} gapy={5}>
        <p>Modifier le profil</p>
        <div className="rounded-full border border-gray-300 w-30 overflow-hidden self-center">
          <img
            src={"/img/profilePicture.png"}
            alt="avatar picture"
            className="self-center"
          />
        </div>
        <span className="flex">
          <TextField
            type="text"
            placeholder="Nom"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            type="text"
            placeholder="Prénom"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </span>
        <TextField
          type="email"
          placeholder="Adresse email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          icon={<Mail />}
          required
        />
        <TextField
          type="password"
          placeholder="Mot de passe"
          name="password"
          value={formData.password}
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
    </div>
  );
}
