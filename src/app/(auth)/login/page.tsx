import React from "react";
import { LoginClient } from "./_components/client";
import { session } from "@/lib/session";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const auth = await session();
  if (auth.status) {
    if (auth.role === "kasir") redirect("/");
    if (auth.role === "admin" || auth.role === "superadmin") redirect("/admin");
  }

  return (
    <div className="w-svw h-svh flex items-center justify-center bg-radial from-gray-300 to-white">
      <LoginClient />
    </div>
  );
};

export default LoginPage;
