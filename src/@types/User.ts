export type User = {
  id: string
  userName: string
  role: Role
  permissions: Permission[] | undefined
}

export type Permission = {  
  userName: string
  queryLimit: number
  credentials: number
  action: string
  resource: string
}

export enum Role {
    System = "System",
    Guest = "Guest",
    Free = "Free",
    Trial = "Trial",
    Paid = "Paid"
}