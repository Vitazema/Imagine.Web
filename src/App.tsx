import Txt2Img from "./components/Features/Txt2img"
import Header from "./components/Header/Header"
import { QueryClient, QueryClientProvider } from "react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { UserProvider } from "./context/UserContext"
import ArtDetail from "./components/Arts/ArtDetail"
import Gallery from "./components/Arts/Gallery"
import SignUp from "./components/Account/SignUp"
import { Dashboard } from "./components/Account/Dashboard"
import { Footer } from "./components/Common/Footer"
import { About } from "./components/Common/About"
import { Checkout } from "./components/Payment/Checkout"
import Creator from "./components/Arts/Creator"
import PageNotFound from "./components/Common/NotFound"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Creator />} />
            <Route path="/signup" Component={SignUp} />
            <Route path="/gallery" element={<Gallery />}></Route>
            <Route path="/gallery/:id" element={<ArtDetail />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  )
}

export default App
