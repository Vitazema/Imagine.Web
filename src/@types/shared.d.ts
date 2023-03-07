export interface ContextProps {
  children?: React.ReactNode;
}

export type ArtsContextType = {
  arts: Art[]
  addArt: (prompt: Prompt) => void
  cancelArt: (id: number) => void
}

export type CurrentUser = {
  userName: string
  isLoggedIn: boolean
  login: () => void
}
