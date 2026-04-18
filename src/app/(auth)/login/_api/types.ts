export type LoginResponse = {
  status: boolean;
  message: string;
  resource: LoginResource;
};

export type LoginResource = {
  token: string;
  user: LoginUser;
};

export type LoginUser = {
  id: number;
  store_id: number;
  name: string;
  username: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
};

export type LoginBody = {
  email_or_username: string;
  password: string;
};
