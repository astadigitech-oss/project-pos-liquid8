export type StoreDetailResponse = {
  status: boolean;
  message: string;
  resource: {
    products: {
      data: Array<{
        id: number;
        store_id: number;
        barcode: string;
        name: string;
        price: number;
        tag_color: string;
        quantity: number;
        status: string;
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
    store: {
      address: string;
      id: number;
      phone: string;
      store_name: string;
      total_price_product: number;
      total_sales_today: number;
      total_stock: number;
    };
  };
};

export type StoreChartResponse = {
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
