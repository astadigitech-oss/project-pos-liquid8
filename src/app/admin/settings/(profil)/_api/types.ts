export type UserInfo = {
  message: string;
  resource: {
    email: string;
    id: number;
    name: string;
    role: string;
    store_name: string;
    username: string;
  };
  status: boolean;
};

export type UserBodyUpdate = {
  name: string;
  email: string;
};
export type UserPasswordBodyUpdate = {
  old_password: string;
  new_password: string;
};

export type UserDataResponse = {
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
    store_: {
      id: number;
      timezone: string;
      token: string;
      store_name: string;
      phone: string;
      address: string;
      created_at: string;
      updated_at: string;
    };
  };
  status: boolean;
};
