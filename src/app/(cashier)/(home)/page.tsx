import React from "react";
import { HomeClient } from "./_components/client";
import { session } from "@/lib/session";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kasir",
};

const HomePage = async () => {
  const auth = await session();
  if (!auth.status) redirect("/login");
  if (auth.status && (auth.role === "admin" || auth.role === "superadmin"))
    redirect("/admin");

  return (
    <div className="p-4">
      <HomeClient />
    </div>
  );
};

export default HomePage;
