import { User } from "../@types/User"

export interface ContextProps {
  children?: React.ReactNode
}

export interface IAuthContext {
  userName: string
  currentUser: User
  login: () => void
}
