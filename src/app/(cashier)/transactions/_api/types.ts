export type transactionListResponse = {
  message: string;
  resource: {
    data: Array<{
      id: number;
      invoice: string;
      total_item: number;
      total_quantity: number;
      kasir: string;
      store_name: string;
      subtotal: number;
      tax: number;
      total_amount: number;
      status: string;
      payment_method: string;
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
  success: boolean;
};
