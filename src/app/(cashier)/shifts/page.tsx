import React from "react";
import { ShiftsClient } from "./_components/client";
import { session } from "@/lib/session";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manajemen Shift",
};

const ShiftPage = async () => {
  const auth = await session();
  if (!auth.status) redirect("/login");
  if (auth.status && (auth.role === "admin" || auth.role === "superadmin"))
    redirect("/admin");

  return (
    <div className="p-4">
      <ShiftsClient />
    </div>
  );
};

export default ShiftPage;
