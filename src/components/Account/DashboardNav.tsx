import { List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import DashboardIcon from "@mui/icons-material/Dashboard"

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
        </ListItemButton>
      ))}
    </List>
  )
}
