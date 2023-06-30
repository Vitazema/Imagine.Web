export interface ContextProps {
  children?: React.ReactNode;
}

export interface IArtDbContext {
  arts: Art[]
  features: Features[]
  getApiStatus(): { status: Status; isSuccess: boolean; error: string | null };
  getArts: () => void
  addArt: (prompt: Prompt) => void
  cancelArt: (id: number) => void
}

export type CurrentUser = {
  userName: string
  isLoggedIn: boolean
  login: () => void
}
