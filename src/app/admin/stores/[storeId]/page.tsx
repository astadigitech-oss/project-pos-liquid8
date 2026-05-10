import { session } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";
import { StoreIdClient } from "./_components/client";

const StoreIdPage = async () => {
  const auth = await session();
  if (!auth.status) redirect("/login");
  if (auth.status && auth.role === "kasir") redirect("/");
  return <StoreIdClient />;
};

export default StoreIdPage;
