import "server-only";
import { cookies } from "next/headers";
import { apiUrl, secretStore } from "@/config";

export async function session() {
  const cookie = await cookies();
  const token = cookie.get(secretStore)?.value;
  try {
    const res = await fetch(`${apiUrl}/api/checkLogin`, {
      method: "GET",
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      return false;
    }

    return true;
  } catch (error) {
    console.log("ERROR_CHECK", error);
    return false;
  }
}
