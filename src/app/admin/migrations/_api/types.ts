export type MigrationListResponse = {
  status: boolean;
  message: string;
  resource: {
    data: Array<{
      id: number;
      store_id: number;
      store_name: string;
      code: string;
      user: string;
      total_product: number;
      total_price: number;
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
};
