export interface IArt {
    id: number
    title: string
    progress: number
}

export type ArtsContextType = {
    arts: Art[];
    addArt: (title: string) => void;
    cancelArt: (id: number) => void;
};