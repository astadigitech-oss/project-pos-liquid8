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
export type PpnDetailResponse = {
  data: {
    id: number;
    ppn: number;
    is_tax_default: boolean;
    created_at: string;
    updated_at: string;
  };
  message: string;
  success: boolean;
};

export type AddPpnBody = {
  ppn: number;
};

export type AddPpnResponse = {
  data: {
    id: number;
    ppn: number;
    is_tax_default: boolean;
    created_at: string;
    updated_at: string;
  };
  message: string;
  success: boolean;
};

export type UpdatePpnBody = {
  ppn: number;
  is_tax_default: boolean;
};

export type UpdatePpnResponse = {
  data: {
    id: number;
    ppn: number;
    is_tax_default: boolean;
    created_at: string;
    updated_at: string;
  };
  message: string;
  success: boolean;
};
