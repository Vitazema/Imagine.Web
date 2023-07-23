import { User } from "../@types/User";

export interface ContextProps {
  children?: React.ReactNode;
}

export interface IAuthContext {
  currentUser: User
  isLoggedIn: boolean
  login: () => void
}