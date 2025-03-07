"use client";
import React from "react";
import { Button } from "@/ui/atoms/Button/Button";
import { Stack } from "@/ui/layouts/Stack/Stack";
import * as Drawer from "@/ui/organisms/Drawer/Drawer";
import AvatarSelector from "./AvatarSelector";

interface SecondRegisterFormProps {
  goBack: () => void;
  formData: {
    lastName: string;
    firstName: string;
    email: string;
    password: string;
    profilePicture: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      lastName: string;
      firstName: string;
      email: string;
      password: string;
      profilePicture: string;
    }>
  >;
}

export default function SecondRegisterForm({
  goBack,
  formData,
  setFormData,
}: SecondRegisterFormProps) {
  return (
    <>
      <Stack className="mt-5 p-5" direction={"col"} gapy={5}>
        <p className="text-center">Mon avatar</p>
        <div className="rounded-full border border-gray-300 w-30 overflow-hidden self-center">
          <img
            src={formData.profilePicture} // ✅ Utilisation de `formData`
            alt="avatar picture"
            className="self-center"
          />
        </div>

        <Drawer.Root title={"Changer d'avatar"}>
          <Drawer.Trigger asChild>
            <Button
              className="mt-5 shrink-0"
              variant={"outline"}
              label={"Modifier l'avatar"}
            />
          </Drawer.Trigger>

          <AvatarSelector />

          <Drawer.Cancel label="Annuler" />
          <Drawer.Action>
            <Button label={"Choisir"} />
          </Drawer.Action>
        </Drawer.Root>

        <Button
          className="py-3 mt-5"
          label={"Retour"}
          variant="outline"
          onClick={goBack}
        />

        <Button className="py-3 mt-5" label={"Suivant"} type="submit" />
      </Stack>
    </>
  );
}
