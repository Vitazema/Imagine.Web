import "./App.css"

import ArtProvider from "./context/ArtContext"
import ArtGallery from "./components/Arts/ArtGallery"
import ArtForm from "./components/ArtForm/ArtForm"
import MainHeader from "./components/Header/MainHeader"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ArtProvider >
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
    </QueryClientProvider>
  )
}

export default App
