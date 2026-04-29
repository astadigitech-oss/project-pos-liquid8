export type StaffListResponse = {
  data: {
    message: string;
    resource: {
      data: Array<{
        id: number;
        name: string;
        username: string;
        email: string;
        store_name: string;
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
};
