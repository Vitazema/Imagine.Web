import "./App.css"

import ArtProvider from "./context/ArtContext"
import ArtGallery from "./components/Arts/ArtGallery"
import ArtForm from "./components/ArtForm/ArtForm"
import MainHeader from "./components/Header/MainHeader"

function App() {
  return (
    <>
      <ArtProvider>
        <section>
          <MainHeader />
        </section>
        <section>
          <ArtForm />
        </section>
        <section>
          <ArtGallery />
        </section>
      </ArtProvider>
    </>
  )
}

export default App
