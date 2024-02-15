import React from "react"
import { UserContext } from "../../context/UserContext"
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material"
import Link from "@mui/material/Link"
import Title from "./Title"
import { Order } from "../../@types/Order"

export default function OrderList({ orders }: { orders: Order[] }) {
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
            {orders.map((o) => (
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
        <Link
          color="primary"
          href="#"
          onClick={(e) => e.preventDefault()}
          sx={{ mt: 3 }}
        >
          See more orders
        </Link>
      </Paper>
    </Grid>
  )
}
