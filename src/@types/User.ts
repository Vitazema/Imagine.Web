export type User = {
  id: number
  fullName: string
  permissions: Permission[] | undefined
  roles: string[] | undefined
}

export type Permission = {  
  userName: string
  action: string
  resource: string
  queryLimit: number
  credentials: number
}