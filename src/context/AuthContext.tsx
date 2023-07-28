import React, { useEffect } from "react"
import { ContextProps } from "../@types/context"
import { useGetUser } from "./UserHooks"
import { IAuthContext } from "./IAuthContext"
import { User } from "../@types/User"

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext)

const AuthProvider: React.FC<ContextProps> = ({ children }) => {
  
  const [userName, setUserName] = React.useState("System")

  const user = useGetUser(userName)

  const [isLoggedIn, setLoggedIn] = React.useState(true)
  const [currentUser, setUser] = React.useState<User>(user.data as User)

  useEffect(() => {
    if (user.isSuccess) {
      setUser(user.data)
      // setLoggedIn(true)
    }
  }, [user.data])

  const loginHandler = () => {
    if (userName != "System"){
      setUserName("System")
      user.refetch()
      return
    }
    else{
      setUserName("PaidUser")
      user.refetch()
    }
  }

  const contextValue: IAuthContext = {
    userName,
    currentUser,
    isLoggedIn,
    login: loginHandler,
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
