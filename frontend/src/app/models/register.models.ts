export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
}

export interface RegisterResponse {
  token: string;
  user: {
    username: string;
    email: string;
  };
}
