import { session } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

const ShiftsPage = async () => {
  const auth = await session();
  if (!auth.status) redirect("/login");
  if (auth.status && auth.role === "kasir") redirect("/");
  return <div>Shift Page</div>;
};

export default ShiftsPage;
