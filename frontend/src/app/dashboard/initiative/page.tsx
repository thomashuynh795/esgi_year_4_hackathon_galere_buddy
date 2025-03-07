"use client";

import { useEffect, useState } from "react";
import { InitiativeComponent } from "../(components)/InitiativeComponent";
import { User } from "@/types/Post";

interface UserResponse {
  user: User;
}

interface Participant {
  user: User;
}

interface Initiative {
  id: string;
  title: string;
  description: string;
  participants: Participant[];
}

export default function Initiative() {
  const [initiatives, setInitiatives] = useState<Initiative[]>([]);
  const [user, setUser] = useState<UserResponse | null>(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3001/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUser(data);
  };

  const fetchInitiatives = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:3001/initiatives", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setInitiatives(data);
  };

  useEffect(() => {
    fetchInitiatives();
    fetchUser();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Liste des Initiatives</h2>
      {initiatives.length > 0 ? (
        <div>
          {initiatives.map((initiative, index) => {
            let isParticipant = false;

            if (user) {
              for (const participant of initiative.participants) {
                if (participant.user.id === user.user.id) {
                  isParticipant = true;
                  break;
                }
              }
            }
       
            return (
              <InitiativeComponent
                key={initiative.id}
                id={initiative.id}
                title={initiative.title}
                description={initiative.description}
                isParticipant={isParticipant}
                className="mb-6 p-6 border border-gray-300 rounded-lg shadow-md bg-white"
                // Callback pour rafraîchir les initiatives après une action
                onParticipationChange={fetchInitiatives}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">Chargement des initiatives...</p>
      )}
    </div>
  );
}