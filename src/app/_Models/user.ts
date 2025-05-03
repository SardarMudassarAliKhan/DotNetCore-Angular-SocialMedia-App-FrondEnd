export interface User {
  id: number;
  userName: string;
  token: string;
  tokenExpires: Date;
  refreshToken: string;
}

