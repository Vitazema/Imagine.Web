import { List, ListItem, ListItemButton, ListItemIcon } from "@mui/material"
import React from "react"
import { UserContext } from "../../context/UserContext"
import { ProfileOrders } from "./ProfileOrders"

export const Profile = () => {
  const userContext = React.useContext(UserContext)

  return (
    <div>
      <List>
        <ListItemButton>
          <ListItemIcon></ListItemIcon>
        </ListItemButton>
      </List>
      <ProfileOrders />
    </div>
  )
}
