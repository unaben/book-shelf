export interface IUser {
  $id: string;
  email: string;
  name: string;
}

export interface IAuthContextState {
  user: IUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}