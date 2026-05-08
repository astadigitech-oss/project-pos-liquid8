export type transactionDetailResponse = {
  message: string;
  resource: {
    id: number;
    invoice: string;
    kasir: string;
    user_cancel: string;
    customer_name: string;
    total_item: number;
    total_quantity: number;
    total_packaging_qty: number;
    total_packaging_price: number;
    paid_amount: number;
    change_amount: number;
    payment_method: string;
    subtotal: number;
    pembulatan: number;
    total_amount: number;
    status: string;
    created_at: string;
    note: string;
    store: {
      name: string;
      phone: string;
      address: string;
    };
    ppn: {
      tax: number;
      amount: number;
    };
    products: Array<{
      id: number;
      barcode: string;
      product_name: string;
      price: number;
      quantity: number;
    }>;
    items: Array<{
      name: string;
      price: number;
      quantity: number;
      total: number;
    }>;
  };
  success: boolean;
};
