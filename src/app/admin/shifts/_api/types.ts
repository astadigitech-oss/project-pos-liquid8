export type ShiftListResponse = {
  message: string;
  resource: {
    data: Array<{
      id: number;
      store_id: number;
      open_by: number;
      closed_by: number;
      start_time: string;
      end_time: string;
      status: string;
      initial_cash: number;
      total_cash: number;
      total_transfer: number;
      total_qris: number;
      total_tax: number;
      subtotal: number;
      expected_amount: number;
      actual_cash: number;
      difference: number;
      note: string;
      created_at: string;
      updated_at: string;
      user_open: string;
      user_close: string;
      store_name: string;
      expected_cash: number;
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
