import { apiUrl, secretStore } from "@/config";
import { getCookie } from "cookies-next/client";
import { DashboardIndexResponse, DashboardSalesResponse } from "./types";

export const dashboardIndexQuery =
  async (): Promise<DashboardIndexResponse> => {
    const token = getCookie(secretStore);
    const response = await fetch(`${apiUrl}/api/dashboard/index`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const res = (await response.json()) as DashboardIndexResponse;

    if (!response.ok) throw new Error(res.message);

    return res;
  };

export const dashboardSalesQuery = async (
  period: string,
): Promise<DashboardSalesResponse> => {
  const token = getCookie(secretStore);
  const response = await fetch(
    `${apiUrl}/api/dashboard/sales-total?period=${period}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const res = (await response.json()) as DashboardSalesResponse;

  if (!response.ok) throw new Error(res.message);

  return res;
};
