import React, { useEffect } from "react"
import { UserContext } from "../../context/UserContext"
import { useGetPermissions } from "../../context/UserHooks"
import { ArtContext } from "../../context/ArtContext"
import { Button } from "@mui/material"

const UserManagement: React.FC = () => {
  const userContext = React.useContext(UserContext)
  const artContext = React.useContext(ArtContext)

  const [username, setUsername] = React.useState<string>("")
  const [password, setPassword] = React.useState<string>("")
  const [creds, setCreds] = React.useState<number>()

  const userPermissionResponse = useGetPermissions(userContext.currentUser, {
    enabled: !!userContext.currentUser,
  })

  useEffect(() => {
    if (userPermissionResponse.isSuccess) {
      userPermissionResponse.refetch()
      setCreds(userPermissionResponse.data?.credentials)
    }
  }, [userPermissionResponse.data, userContext.currentUser, artContext.arts])

  const loginHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const isLoggenIn = await userContext.login(username)
    if (isLoggenIn) {
      setCreds(userPermissionResponse.data?.credentials)
    }
  }

  if (!userContext.currentUser) {
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
          Logged in as: {userContext.currentUser.userName}
          <br />
          Credentials: {creds}
        </p>
        <Button variant="contained" onClick={userContext.logout}>
          Logout
        </Button>
      </div>
    )
  }
}

export default UserManagement
