import Art from "../models/Art";

export type ArtsContextType = {
    arts: Art[];
    addArt: (title: string) => void;
    cancelArt: (id: number) => void;
};
