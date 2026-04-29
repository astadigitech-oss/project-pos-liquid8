export type PpnListResponse = {
  data: Array<{
    id: number;
    ppn: number;
    is_tax_default: boolean;
    created_at: string;
    updated_at: string;
  }>;
  message: string;
  success: boolean;
};
