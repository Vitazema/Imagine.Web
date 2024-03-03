import React from "react"
import Avatar from "@mui/material/Avatar"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import IconButton from "@mui/material/IconButton"
import { UserContext } from "../../context/UserContext"
import { Grid } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Role } from "../../@types/User"

export default function Account({
  credentials,
}: {
  credentials: number | undefined
}) {
  const userContext = React.useContext(UserContext)
  const nav = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const upgradeUserHandler = () => {
    nav("/signup")
    handleClose()
  }

  return (
    <Grid item>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Avatar sx={{ width: 32, height: 32 }}>
          {userContext.currentUser?.userName.charAt(0)}
        </Avatar>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            nav("/dashboard")
          }}
        >
          Profile: {userContext.currentUser?.userName}
        </MenuItem>
        {/* <MenuItem>Credentials: {credentials}</MenuItem> */}
        {userContext.currentUser === undefined ||
        userContext.currentUser?.role === Role.Guest ? (
          <MenuItem onClick={upgradeUserHandler}>Sign Up</MenuItem>
        ) : null}
        <MenuItem onClick={userContext.logout}>Logout</MenuItem>
      </Menu>
    </Grid>
  )
}
