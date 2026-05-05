export type StoreListResponse = {
  status: boolean;
  message: string;
  resource: {
    data: Array<{
      id: number;
      store_name: string;
      phone: string;
      address: string;
      total_product: number;
      total_sales: number;
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
