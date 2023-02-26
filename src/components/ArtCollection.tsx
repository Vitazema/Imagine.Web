import React, {useContext} from 'react'
import { ArtsContext } from '../context/ArtsContext';
import ArtItem from './ArtItem';

import classes from './Arts.module.css'

const ArtCollection: React.FC = () => {

    const artsContext = React.useContext(ArtsContext)

    return (<ul className={classes.arts}>
        {artsContext?.arts.map((item) => (
            <ArtItem key={item.id}
            title={item.title}
            progress={item.progress}
            onCancelPrompt={artsContext.cancelArt.bind(null, item.id)} />
        ))}
    </ul>
    );
}

export default ArtCollection;