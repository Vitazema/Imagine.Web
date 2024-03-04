import { Configuration } from "./Configuration"
import { UserSettings as UserSettings } from "./UserSettings"

export type User = {
  id: string
  userName: string
  token: string
  role: Role
  userSettings?: UserSettings
  permission?: Permission
  subscription?: Subscription
  configurations?: Configuration[]
}

export type Credentials = {
  userName: string
  email: string
  password: string
}

export type Permission = {
  userName: string
  action: string
  resource: string
  queryLimit: number
  credentials: number
}

export enum Role {
  System = "System",
  Guest = "Guest",
  Free = "Free",
  Trial = "Trial",
  Paid = "Paid",
}

export type Subscription = {
  userName: string
  role: Role
  expiresAt: Date
}
