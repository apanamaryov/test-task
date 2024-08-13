export interface LoginCredentials {
  username: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
}

export interface SuccessAuthResponse {
  userId: string;
  accessToken: string;
}

export interface UserContextType {
  user: SuccessAuthResponse | null;
  login: (credentials: LoginCredentials) => void;
}
