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
export type ShiftDetailResponse = {
  status: boolean;
  message: string;
  resource: {
    items: Array<{
      id: number;
      status: string;
      transaction_id: number;
      invoice: string;
      product_name: string;
      quantity: number;
      price: number;
      discount_price: number;
      subtotal: number;
      created_at: string;
    }>;
    summary: {
      actual_cash: number;
      difference: number;
      end: string;
      expected_cash: number;
      initial_cash: number;
      note: string;
      start: string;
      total_invoice: number;
      total_penjualan: number;
      total_subtotal: number;
      total_tax: number;
      user_closed: string;
      user_open: string;
    };
  };
};
