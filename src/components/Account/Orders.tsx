import React from "react"
import { UserContext } from "../../context/UserContext"
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material"
import Link from "@mui/material/Link"
import { useGetUserOrders } from "../../context/UserHooks"
import { dateFormatter } from "../../utils/DateFormatter"
import { ApiStatus } from "../Common/ApiStatus"
import Title from "./Title"

function preventDefault(event: React.MouseEvent) {
  event.preventDefault()
}

export const Orders = () => {
  const userContext = React.useContext(UserContext)
  const { data, status, isSuccess } = useGetUserOrders(userContext.token ?? "")

  if (!isSuccess) {
    return <ApiStatus status={status} />
  }

  return (
    <Grid item xs={12}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Title>Orders</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((o) => (
                <TableRow key={o.id}>
                  <TableCell component="th" scope="row">
                    {o.id}
                  </TableCell>
                  {/* <TableCell align="right">{dateFormatter.format(new Date(o.date))}</TableCell> */}
                  <TableCell align="right">{o.status}</TableCell>
                  <TableCell align="right">{o.credentials}</TableCell>
                  <TableCell align="right">{o.subtotal}</TableCell>
                  {/* <TableCell align="right">{o.subscription.expiresAt.getDate()}</TableCell> */}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
          See more orders
        </Link>
      </Paper>
    </Grid>
  )
}
