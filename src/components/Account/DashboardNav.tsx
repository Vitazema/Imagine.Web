import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import DashboardIcon from "@mui/icons-material/Dashboard"
import { useEffect } from "react"
import { orders } from "./Dashboard"

const navigationList = [
  {
    text: "Profile",
    icon: <DashboardIcon />,
  },
  {
    text: "Orders",
  },
]

export default function DashboardNav({
  selectedIndex,
  setSelectedIndex,
}: {
  selectedIndex: number
  setSelectedIndex: (index: number) => void
}) {
  let orderLenght = orders.value.length
  useEffect(() => {
    orderLenght = orders.value.length
  }, [orders])

  return (
    <List component="nav">
      {navigationList.map((item) => (
        <ListItemButton
          key={item.text}
          sx={{
            backgroundColor:
              selectedIndex === navigationList.indexOf(item)
                ? "primary.light"
                : "inherit",
          }}
          onClick={() => setSelectedIndex(navigationList.indexOf(item))}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
          {item.text === "Orders" && orders.value.length}
        </ListItemButton>
      ))}
    </List>
  )
}
