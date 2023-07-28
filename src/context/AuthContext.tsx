import React, { useEffect } from "react"
import { ContextProps } from "../@types/context"
import { useGetUser } from "./UserHooks"
import { IAuthContext } from "./IAuthContext"
import { User } from "../@types/User"

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext)

const AuthProvider: React.FC<ContextProps> = ({ children }) => {
  
  const [userId, setUserId] = React.useState(1)

  const user = useGetUser(userId)

  const [isLoggedIn, setLoggedIn] = React.useState(true)
  const [currentUser, setUser] = React.useState<User>(user.data as User)

  useEffect(() => {
    if (user.isSuccess) {
      setUser(user.data)
      // setLoggedIn(true)
    }
  }, [user.data])

  const loginHandler = () => {
    if (userId >= 5){
      setUserId(1)
      user.refetch()
      return
    }
    else{
      setUserId(userId + 1)
      user.refetch()
    }
  }

  const contextValue: IAuthContext = {
    userId,
    currentUser,
    isLoggedIn,
    login: loginHandler,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
