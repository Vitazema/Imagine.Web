import { Subscription } from "./User"

export type Order = {
  id: string
  date: Date
  subtotal: number
  status: string
  credentials: number
  subscription: Subscription
}