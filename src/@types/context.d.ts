export interface ContextProps {
  children?: React.ReactNode;
}

export type IArtDbContext = {
  arts: Art[]
  getArts: () => void
  addArt: (prompt: Prompt) => void
  cancelArt: (id: number) => void
  isLoading: boolean
  error: string | null
}

export type CurrentUser = {
  userName: string
  isLoggedIn: boolean
  login: () => void
}
