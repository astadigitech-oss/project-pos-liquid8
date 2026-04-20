export type CurrentCartResponse = {
  status: boolean;
  message: string;
  resource: {
    items: {
      id: number;
      store_id: number;
      member_id: number;
      user_id: number;
      product_id: number;
      keep_code: string | null;
      barcode: string;
      product_name: string;
      quantity: number;
      price: number;
      discount_price: number;
      subtotal: number;
      created_at: string;
      updated_at: string;
    }[];
    ppn: {
      amount: number;
      tax: number;
    };
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
  resource: Array<{
    id: number;
    store_id: number;
    member_id: number;
    user_id: number;
    product_id: number;
    keep_code: any;
    product_name: string;
    quantity: number;
    price: number;
    discount_price: number;
    subtotal: number;
    created_at: string;
    updated_at: string;
  }>;
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
  product_barcode: string;
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
export type CheckoutTransactionResponse = {
  status: boolean;
  message: string;
  resource: {
    id: number;
    store_id: number;
    user_id: number;
    shift_id: number;
    member_id: number;
    invoice: string;
    total_item: number;
    total_quantity: number;
    member_point: number;
    subtotal: number;
    tax: number;
    discount: number;
    total_amount: number;
    paid_amount: number;
    change_amount: number;
    payment_method: string;
    status: string;
    created_at: string;
    updated_at: string;
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

export type ShiftResponse = {
  status: boolean;
  message: string;
  resource: {
    id: number;
    store_id: number;
    open_by: number;
    closed_by: string | null;
    start_time: string;
    status: string;
    initial_cash: number;
    expected_cash: number;
    actual_cash: number;
    difference: number;
    note: string | null;
    created_at: string;
    updated_at: string;
  };
};
