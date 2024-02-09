import React, { useEffect } from "react"
import { UserContext } from "../../context/UserContext"
import { useGetPermissions } from "../../context/UserHooks"
import { Button, Grid, Modal } from "@mui/material"
import Account from "../Account/Account"
import SignIn from "../Account/SignIn"

const UserManagement: React.FC = () => {
  const userContext = React.useContext(UserContext)

  const [creds, setCreds] = React.useState<number>()
  const [isOpenLogin, setOpenLogin] = React.useState<boolean>(false)

  const userPermissionResponse = useGetPermissions(userContext.currentUser, {
    enabled: !!userContext.currentUser,
  })

  useEffect(() => {
    if (userPermissionResponse.isSuccess) {
      userPermissionResponse.refetch()
      setCreds(userPermissionResponse.data?.credentials)
    }
  }, [userPermissionResponse.data, userContext.currentUser])

  if (!userContext.currentUser) {
    return (
      <Grid item>
        <Button variant="contained" onClick={() => setOpenLogin(true)}>
          Login
        </Button>
        <Modal
          open={isOpenLogin}
          onClose={() => setOpenLogin(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <SignIn/>
        </Modal>
      </Grid>
    )
  } else {
    return (
      <Grid item style={{ display: "flex", alignItems: "center" }}>
        Credentials: {creds}
        <Account />
      </Grid>
    )
  }
}

export default UserManagement
