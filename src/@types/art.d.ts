export type ArtsContextType = {
  arts: Art[];
  addArt: (prompt: Prompt) => void;
  cancelArt: (id: number) => void;
};
