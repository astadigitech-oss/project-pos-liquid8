export type InventoryListResponse = {
  message: string;
  resource: {
    data: Array<{
      id: number;
      store_id: number;
      barcode: string;
      name: string;
      price: number;
      tag_color: string;
      quantity: number;
      status: string;
      store_name: string;
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
  status: boolean;
};
