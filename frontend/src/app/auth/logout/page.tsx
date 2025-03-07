"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
    localStorage.removeItem("token");
  return redirect("/auth/login");
}
