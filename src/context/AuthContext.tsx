import React from "react"
import { ContextProps, CurrentUser } from "../@types/context"

const DUMMY_USER = "system"

export const AuthContext = React.createContext<CurrentUser>({
  userName: DUMMY_USER,
  isLoggedIn: true,
  login: () => {},
})

const AuthProvider = ({ children }: ContextProps) => {
  const [isLoggedIn, setLoggedIn] = React.useState(true)

  const loginHandler = () => {
    setLoggedIn(!isLoggedIn)
  }

  const contextValue: CurrentUser = {
    userName: DUMMY_USER,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
