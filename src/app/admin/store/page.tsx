import React from "react";
import { StoreAdminClient } from "./_components/client";
import { session } from "@/lib/session";
import { redirect } from "next/navigation";

const StoreAdminPage = async () => {
  const auth = await session();
  if (!auth.status) redirect("/login");
  if (auth.status && auth.role === "kasir") redirect("/");
  return (
    <div>
      <StoreAdminClient />
    </div>
  );
};

export default StoreAdminPage;
