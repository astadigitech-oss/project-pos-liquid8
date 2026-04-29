import React from "react";
import { HomeClient } from "./_components/client";
import { session } from "@/lib/session";
import { redirect } from "next/navigation";

const HomePage = async () => {
  const auth = await session();
  if (!auth.status) redirect("/login");
  if (auth.status && auth.role === "admin") redirect("/admin");

  return (
    <div className="p-4">
      <HomeClient />
    </div>
  );
};

export default HomePage;
