import React from "react"
import { ContextProps, CurrentUser } from "../@types/context"

const DUMMY_USER = "System"

const AuthContext = React.createContext<CurrentUser>({
} as CurrentUser)

const AuthProvider: React.FC<ContextProps> = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = React.useState(true)
  const [userName, setUserName] = React.useState(DUMMY_USER)

  const loginHandler = () => {
    setLoggedIn(!isLoggedIn)
    if (isLoggedIn) {
      setUserName(DUMMY_USER)
    } else {
      setUserName("Mudk")
    }
  }

  const contextValue = {
    userName: userName,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export {AuthContext, AuthProvider}
