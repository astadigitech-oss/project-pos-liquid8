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
export type transactionDetailResponse = {
  message: string;
  resource: {
    id: number;
    invoice: string;
    kasir: string;
    customer_name: string;
    total_item: number;
    total_quantity: number;
    paid_amount: number;
    change_amount: number;
    pembulatan: number;
    payment_method: string;
    subtotal: number;
    total_amount: number;
    status: string;
    created_at: string;
    store: {
      name: string;
      phone: string;
      address: string;
    };
    ppn: {
      tax: number;
      amount: number;
    };
    items: Array<{
      id: number;
      barcode: string;
      product_name: string;
      price: number;
      quantity: number;
    }>;
  };
  success: boolean;
};
