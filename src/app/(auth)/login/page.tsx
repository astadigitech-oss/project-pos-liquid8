import React from "react";
import { LoginClient } from "./_components/client";
import { session } from "@/lib/session";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const auth = await session();
  if (auth) redirect("/");

  return (
    <div className="w-svw h-svh flex items-center justify-center bg-radial from-gray-300 to-white">
      <LoginClient />
    </div>
  );
};

export default LoginPage;
