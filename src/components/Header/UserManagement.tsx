import React, { useEffect } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useGetPermissions } from "../../context/UserHooks"
import { ArtContext } from "../../context/ArtContext"
import { Button } from "@mui/material"

const UserManagement: React.FC = () => {
  const authContext = React.useContext(AuthContext)
  const artContext = React.useContext(ArtContext)

  const [username, setUsername] = React.useState<string>("")
  const [password, setPassword] = React.useState<string>("")
  const [creds, setCreds] = React.useState<number>()

  const userPermissionResponse = useGetPermissions(authContext.currentUser, {
    enabled: !!authContext.currentUser,
  })

  useEffect(() => {
    if (userPermissionResponse.isSuccess) {
      userPermissionResponse.refetch()
      setCreds(userPermissionResponse.data?.credentials)
    }
  }, [userPermissionResponse.data, authContext.currentUser, artContext.arts])

  const loginHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const isLoggenIn = await authContext.login(username)
    if (isLoggenIn) {
      setCreds(userPermissionResponse.data?.credentials)
    }
  }

  if (!authContext.currentUser) {
    return (
      <div>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter User Name"
        />
        Logging in...
        <Button variant="contained" onClick={loginHandler}>
          Login
        </Button>
      </div>
    )
  } else {
    return (
      <div>
        <p>
          Logged in as: {authContext.currentUser.userName}
          <br />
          Credentials: {creds}
        </p>
        <Button variant="contained" onClick={authContext.logout}>
          Logout
        </Button>
      </div>
    )
  }
}

export default UserManagement
