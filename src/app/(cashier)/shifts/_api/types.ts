export type ShiftListResponse = {
  message: string;
  resource: {
    data: Array<{
      id: number;
      cashier_open: string;
      cashier_closed: string;
      start_time: string;
      end_time: string;
      status: string;
      initial_cash: number;
      expected_cash: number;
      actual_cash: number;
      difference: number;
      store_name: string;
      created_at: string;
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
  status: boolean;
};
