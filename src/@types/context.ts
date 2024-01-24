import { UseMutationResult, UseQueryResult } from "react-query";
import { Art, ArtConfiguration } from "./Art";
import { ArtRequest, AiTypes } from "./shared";
import { AxiosError, AxiosResponse } from "axios";
import Problem from "./problem";

export interface ContextProps {
  children?: React.ReactNode;
}

export interface IArtDbContext {
  arts: Art[]
  setArts: (arts: Art[]) => void
  addArt: (art: ArtConfiguration) => UseMutationResult<AxiosResponse<any, any>, AxiosError<Problem, any>, Art, unknown> | undefined
  editArt: (art: Art) => void
  cancelArt: (art: Art) => void
}
