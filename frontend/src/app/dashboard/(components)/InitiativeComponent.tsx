import React from "react";
import { Text } from "@/ui/atoms/Text/Text";
import { Heading } from "@/ui/atoms/Heading/Heading";
import { Button } from "@/ui/atoms/Button/Button";
import classNames from "classnames";

interface InitiativeProps {
  id: string;
  title: string;
  description: string;
  className?: string;
  isParticipant: boolean;
}

export function InitiativeComponent({ id, title, description, className, isParticipant }: InitiativeProps) {
  const join = async () => {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:3001/participant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        initiativeId: id
      })
    });
  };

  const leave = async () => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:3001/participant/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return (
    <div className={classNames("border border-gray-300 rounded-lg p-4 bg-white shadow-md", className)}>
      <Heading level={3} className="text-lg font-bold mb-2">
        {title}
      </Heading>
      <Text className="text-gray-700">{description}</Text>

      <Button
        variant={isParticipant ? "danger" : "primary"}
        label={isParticipant ? "Quitter" : "Rejoindre"}
        className="mt-4"
        onClick={isParticipant ? () => leave() : () => join()}
      />
    </div>
  );
}
