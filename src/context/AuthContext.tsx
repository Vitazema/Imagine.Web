import React, { useEffect } from "react"
import { ContextProps } from "../@types/context"
import { useGetUser } from "./UserHooks"
import { IAuthContext } from "./IAuthContext"
import { User } from "../@types/User"

const SYSTEM_USER_ID = 1
const GUEST_USER_ID = 2

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext)

const AuthProvider: React.FC<ContextProps> = ({ children }) => {
  const systemUser = useGetUser(SYSTEM_USER_ID)
  const guestUser = useGetUser(GUEST_USER_ID)
  const [isLoggedIn, setLoggedIn] = React.useState(true)
  const [currentUser, setUser] = React.useState<User>(systemUser.data as User)

  useEffect(() => {
    if (systemUser.isSuccess) {
      setUser(systemUser.data)
      setLoggedIn(true)
    }
  }, [systemUser.data])

  const loginHandler = () => {
    if (currentUser !== guestUser.data) {
      if (guestUser.isSuccess) {
        setUser(guestUser.data)
        setLoggedIn(false)
      }
    } else {
      if (systemUser.isSuccess) {
        setUser(systemUser.data)
        setLoggedIn(true)
      }
    }
  }

  const contextValue: IAuthContext = {
    currentUser,
    isLoggedIn,
    login: loginHandler,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
