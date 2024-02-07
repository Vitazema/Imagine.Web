import { Box, CircularProgress } from "@mui/material"
import ErrorModule from "./ErrorModule"

export enum Status {
  Idle = "idle",
  Loading = "loading",
  Succeeded = "succeeded",
  Failed = "failed",
  Error = "error",
}

export const ApiStatus = (props: { status: string }) => {
  switch (props.status as Status) {
    case Status.Loading:
      return (
        <Box sx={{ display: "flex", alignItems: "center", justifyItems: "center"}}>
          <CircularProgress />
        </Box>
      )
    case Status.Failed || Status.Idle:
      return <ErrorModule message="Error communicating with backend" />
    case Status.Error:
      return <ErrorModule message="Unexpected server error." />
    default:
      return <ErrorModule message="Unknown error has occured." />
  }
}
