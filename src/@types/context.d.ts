import { ArtSettings } from "./Art";

export interface ContextProps {
  children?: React.ReactNode;
}

export interface IArtDbContext {
  arts: Art[]
  features: Features[]
  getApiStatus(): { status: Status; isSuccess: boolean; error: string | null };
  getArts: () => void
  submitArt: (art: Art) => void
  editArt: (id: number) => void
  cancelArt: (id: number) => void
}

export type CurrentUser = {
  userName: string
  isLoggedIn: boolean
  login: () => void
}
