export type MemberListResponse = {
  status: boolean;
  message: string;
  resource: {
    data: Array<{
      id: number;
      code: string;
      name: string;
      phone: string;
      store_id: number;
      store_name: string;
      monthly_transaction: number;
      monthly_point: number;
      total_shopping: number;
      total_point: number;
    }>;
    pagination: {
      current_page: number;
      from: number;
      last_page: number;
      per_page: number;
      to: number;
      total: number;
    };
  };
};

export type MemberSummaryResponse = {
  status: boolean;
  message: string;
  resource: {
    new_member: number;
    total_active: number;
    total_all: number;
    total_inactive: number;
  };
};

export type MemberAddBody = {
  name: string;
  phone: string;
  store_id: number;
};
