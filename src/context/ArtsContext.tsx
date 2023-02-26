import React from "react"
import { ArtsContextType } from "../@types/art";
import Art from "../models/Art"

export const ArtsContext = React.createContext<ArtsContextType> ({
    arts: [],
    addArt: () => { },
    cancelArt: (id: number) => { },
})

interface Props {
    children?: React.ReactNode;
}

const ArtsProvider: React.FC<Props> = ({ children }) => {

    const [arts, setArts] = React.useState<Art[]>([
        new Art('A blue ball'),
        new Art('Black cube')
    ]);

    const addArtHandler = (prompt: string) => {
        const newArt = new Art(prompt)
    
        // update state
        setArts((currentArts) => {
            return currentArts.concat(newArt)
        })
    }
    
    const cancelArtHandler = (artId: number) => {
        setArts((currentArts) => {
            return currentArts.filter(art => art.id !== artId)
        })
    }
    
    const contextValue: ArtsContextType = {
        arts: arts,
        addArt: addArtHandler,
        cancelArt: cancelArtHandler,
    }

    return <ArtsContext.Provider value={contextValue}>
        {children}
    </ArtsContext.Provider>
}

export default ArtsProvider