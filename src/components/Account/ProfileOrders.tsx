import React from "react"
import { UserContext } from "../../context/UserContext"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useGetUserOrders } from "../../context/UserHooks"
import { dateFormatter } from "../../utils/DateFormatter"
import { ApiStatus } from "../Common/ApiStatus"

export const ProfileOrders = () => {
  const userContext = React.useContext(UserContext)
  const {data, status, isSuccess} = useGetUserOrders(userContext.token ?? "")

  if (!isSuccess) {
    return <ApiStatus status={status}/>
  }
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data?.map((o) => (
            <TableRow
              key={o.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
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
    </TableContainer>
  )
}