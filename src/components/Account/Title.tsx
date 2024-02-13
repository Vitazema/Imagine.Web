import { Typography } from "@mui/material"

export default function Title({ children }: { children?: React.ReactNode }) {
  return (
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      {children}
    </Typography>
  )
}
