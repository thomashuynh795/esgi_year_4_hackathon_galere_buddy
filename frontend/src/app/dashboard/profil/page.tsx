"use client";
import React, { useState } from "react";
import { TextField } from "@/ui/atoms/Inputs/TextField/TextField";
import { Button } from "@/ui/atoms/Button/Button";
import { Stack } from "@/ui/layouts/Stack/Stack";
import { Mail } from "lucide-react";
import { open as openToast } from "@ui/organisms/Toast/Toast";
// import { modifyUser } from "@/services/fetch.service";

interface FormDataInterface {
  name: string;
  firstname: string;
  email: string;
  password: string;
  profilePicture: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState({ firstName: "John", lastName: "Doe", email: "john.doe@example.com" });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormDataInterface>({
    name: user.lastName,
    firstname: user.firstName,
    email: user.email,
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
    // const res: { jwt: string; message: string } = await modifyUser(formData);
    setUser({ firstName: formData.firstname, lastName: formData.name, email: formData.email });
    setIsEditing(false);

    openToast({
      title: "Success",
      description: "Modification prise en compte",
      style: "success",
    });
  };

  return (
    <div>
      {isEditing ? (
        <div className="h-screen flex flex-col items-center justify-center">
          <Stack className="mt-5 p-5" direction={"col"} gapy={5}>
            <div className="rounded-full border border-gray-300 w-30 overflow-hidden self-center">
              <img src={"/img/profilePicture.png"} alt="avatar picture" className="self-center" />
            </div>
            <span className="flex">
              <TextField type="text" placeholder="Nom" name="name" value={formData.name} onChange={handleChange} required />
              <TextField type="text" placeholder="Prénom" name="firstname" value={formData.firstname} onChange={handleChange} required />
            </span>
            <TextField type="email" placeholder="Adresse email" name="email" value={formData.email} onChange={handleChange} icon={<Mail />} required />
            <TextField type="password" placeholder="Mot de passe" name="password" value={formData.password} onChange={handleChange} required />
            <div className="flex gap-4 mt-5">
              <Button className="py-3" label="Suivant" type="button" onClick={handleSubmit} />
              <Button className="py-3" label="Annuler" type="button" onClick={() => setIsEditing(false)} />
            </div>
          </Stack>
        </div>
      ) : (
        <div style={{
          border: "1px solid #ccc",
          padding: "2rem",
          borderRadius: "8px",
          maxWidth: "600px",
          margin: "2rem auto",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}>
          <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Profil</h1>
          <p><strong>Prénom:</strong> {user.firstName}</p>
          <p><strong>Nom:</strong> {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <Button type="button" label="Modifier le profil" onClick={() => setIsEditing(true)}>Modifier le profil</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
