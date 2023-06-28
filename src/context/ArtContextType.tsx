import { Art } from "../@types/Art";

export type ArtContextType = {
    arts: Art[];
    addArt: (title: string) => void;
    cancelArt: (id: number) => void;
};
