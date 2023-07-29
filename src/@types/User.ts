export type User = {
  id: string
  userName: string
  token: string
  role: Role
  permissions: Permission[] | undefined
  subscription: Subscription | undefined
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
    Paid = "Paid"
}

export type Subscription = {
  userName: string
  role: Role
  expiresAt: Date
}