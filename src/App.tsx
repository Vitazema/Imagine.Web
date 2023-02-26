import './App.css';

import ArtCollection from './components/ArtCollection';
import NewArt from './components/NewArt';
import ArtsProvider from './context/ArtsContext';

function App() {
    
    return (
        <ArtsProvider>
            <NewArt/>
            <ArtCollection/>
        </ArtsProvider>
    );
}

export default App;
