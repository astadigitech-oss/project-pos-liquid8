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
