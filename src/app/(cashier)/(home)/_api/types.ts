export type CurrentCartResponse = {
  status: boolean;
  message: string;
  resource: {
    items: Array<{
      name: string;
      price: number;
      quantity: number;
      total: number;
    }>;
    items_packaging: Array<{
      id: number;
      name: string;
      price: number;
      quantity: number;
      total: number;
    }>;
    pembulatan: number;
    ppn: {
      amount: number;
      tax: number;
    };
    products: Array<{
      id: number;
      product_id: number;
      barcode: string;
      product_name: string;
      quantity: number;
      price: number;
      discount_price: number;
      subtotal: number;
    }>;
    subtotal: number;
    total_amount: number;
  };
};

export type DraftTransactionResponse = {
  status: boolean;
  message: string;
  resource: {
    data: Array<{
      customer_name: string;
      keep_code: string;
      item_count: number;
      total: number;
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

export type ResumeDraftResponse = {
  status: boolean;
  message: string;
  resource: {
    items: Array<{
      name: string;
      price: number;
      quantity: number;
      total: number;
    }>;
    items_packaging: Array<{
      id: number;
      name: string;
      price: number;
      quantity: number;
      total: number;
    }>;
    member_id: number;
    pembulatan: number;
    ppn: {
      amount: number;
      tax: number;
    };
    products: Array<{
      id: number;
      product_id: number;
      barcode: string;
      product_name: string;
      quantity: number;
      price: number;
      discount_price: number;
      subtotal: number;
    }>;
    subtotal: number;
    total_amount: number;
  };
};

export type MemberListResponse = {
  status: boolean;
  message: string;
  resource: {
    data: {
      id: number;
      code: string;
      name: string;
      phone: string;
    }[];
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

export type ProductListResponse = {
  status: boolean;
  message: string;
  resource: {
    data: {
      id: number;
      store_id: number;
      barcode: string;
      name: string;
      price: number;
      quantity: number;
      status: string;
      store_name: string;
      old_barcode: string;
      created_at: string;
    }[];
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

export type DetailMemberResponse = {
  status: boolean;
  message: string;
  resource: {
    id: number;
    store_id: string | null;
    code: string;
    name: string;
    phone: string;
    created_at: string;
    updated_at: string;
  };
};

export type StartShiftBody = {
  initial_cash: number;
};

export type EndShiftBody = {
  actual_cash: number;
  note: string | null;
};

export type AddToCartBody = {
  reference_id: string;
  qty?: number;
  type: "product" | "packaging";
};
export type AddMemberBody = {
  name: string;
  phone: string;
};
export type PendingTransactionBody = {
  member_id: number;
};
export type CheckoutTransactionBody = {
  member_id: number;
  payment_method: string;
  paid_amount: number;
  grand_total: number;
};
export type UpdatePackagingBody = {
  item_id: number;
  qty: number;
};
export type CheckoutTransactionResponse = {
  status: boolean;
  message: string;
  resource: {
    change_amount: number;
    created_at: string;
    customer_name: string;
    id: number;
    invoice: string;
    items: Array<{
      name: string;
      price: number;
      quantity: number;
      total: number;
    }>;
    kasir: string;
    paid_amount: number;
    pembulatan: number;
    payment_method: string;
    ppn: {
      amount: number;
      tax: number;
    };
    store: {
      address: string;
      name: string;
      phone: string;
    };
    shift_id: number;
    subtotal: number;
    total_amount: number;
    total_item: number;
    total_quantity: number;
  };
};

export type AddUpdateMemberResponse = {
  status: boolean;
  message: string;
  resource: {
    id: number;
    store_id: string | null;
    code: string;
    name: string;
    phone: string;
    created_at: string;
    updated_at: string;
  };
};

export type ShiftStartResponse = {
  status: boolean;
  message: string;
  resource: {
    id: number;
    store_id: number;
    open_by: number;
    closed_by: any;
    start_time: string;
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
    note: any;
    created_at: string;
    updated_at: string;
    expected_cash: number;
  };
};

export type ShiftEndResponse = {
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
    pembulatan: number;
    expected_cash: number;
    expected_amount: number;
    actual_cash: number;
    actual_amount: number;
    difference: number;
    note: string;
    store: {
      name: string;
      phone: string;
      address: string;
    };
  };
};

export type ShiftResponse = {
  status: boolean;
  message: string;
  resource: {
    id: number;
    store_id: number;
    open_by: number;
    closed_by: any;
    start_time: string;
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
    note: any;
    created_at: string;
    updated_at: string;
    expected_cash: number;
  };
};

export type ListPackagingResponse = {
  status: boolean;
  message: string;
  resource: Array<{
    id: number;
    name: string;
    price: number;
  }>;
};
