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

export type StaffDetailResponse = {
  data: {
    message: string;
    resource: {
      ID: number;
      StoreID: number;
      Name: string;
      Username: string;
      Role: string;
      Email: string;
      StoreName: string;
    };
    status: boolean;
  };
};

export type StaffAddBody = {
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  store_id?: number;
};

export type StaffEditBody = {
  name: string;
  username: string;
  email: string;
  role: string;
  store_id?: number;
  password?: string;
};

export type StaffAddResponse = {
  data: {
    message: string;
    resource: {
      id: number;
      store_id: number;
      name: string;
      username: string;
      email: string;
      role: string;
      created_at: string;
      updated_at: string;
    };
    status: boolean;
  };
};
export type StaffEditResponse = {
  data: {
    id: number;
    store_id: number;
    name: string;
    username: string;
    email: string;
    role: string;
    created_at: string;
    updated_at: string;
  };
  message: string;
  status: boolean;
};
