export type ShiftDetailResponse = {
  status: boolean;
  message: string;
  resource: {
    start: string;
    end: string;
    user_open: string;
    user_closed: string;
    initial_cash: number;
    total_invoice: number;
    total_cash: number;
    total_transfer: number;
    total_qris: number;
    total_cash_cancel: number;
    total_transfer_cancel: number;
    total_qris_cancel: number;
    total_tax: number;
    total_subtotal: number;
    total_penjualan: number;
    expected_cash: number;
    expected_amount: number;
    actual_cash: number;
    pembulatan: number;
    actual_amount: number;
    difference: number;
    note: string;
    store: {
      name: string;
      phone: string;
      address: string;
    };
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
  };
};
