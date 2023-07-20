import { UseMutationResult, UseQueryResult } from "react-query";
import { Art, ArtSettings } from "./Art";
import { ArtRequest, Features } from "./shared";
import { AxiosError, AxiosResponse } from "axios";
import Problem from "./problem";

export interface ContextProps {
  children?: React.ReactNode;
}

export interface IArtDbContext {
  arts: Art[]
  setArts: (arts: Art[]) => void
  aiType: Features
  setAiType: (aiType: Features) => void
  addArt: (art: ArtSettings) => UseMutationResult<AxiosResponse<any, any>, AxiosError<Problem, any>, Art, unknown> | undefined
  editArt: (id: number) => void
  cancelArt: (id: number) => void
}

export interface CurrentUser {
  userName: string
  isLoggedIn: boolean
  login: () => void
}
