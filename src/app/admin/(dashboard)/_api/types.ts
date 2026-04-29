export type DashboardIndexResponse = {
  status: boolean;
  message: string;
  resource: {
    recent_transactions: Array<{
      id: number;
      invoice: string;
      store_name: string;
      total_amount: number;
      status: string;
      created_at: string;
    }>;
    stock_per_store: Array<{
      store_id: number;
      store_name: string;
      stock: number;
    }>;
    total_price: number;
    total_sales: number;
    total_stock: number;
  };
};

export type DashboardSalesResponse = {
  status: boolean;
  message: string;
  resource: {
    period: string;
    start: string;
    end: string;
    sales: Array<{
      date: string;
      label: string;
      total_sales: number;
    }>;
  };
};
