import "./App.css"

import Categories from "./components/Categories/Categories"
import ArtProvider from "./context/ArtContext"
import ArtGallery from "./components/Arts/ArtGallery"
import ArtForm from "./components/ArtForm/ArtForm"
import AuthContext from "./context/AuthContext"
import Header from "./components/Header/MainHeader"
import AuthProvider from "./context/AuthContext"

const categories = ["lol", "kek"]
const selectCategoryHandler = (selectedCategory: string) => {
  const category = {
    selectedCategory,
    id: Math.random().toString(),
  }
  console.log(category)
}

function App() {
  return (
    <>
      <Header />
      <ArtProvider>
        <Categories
          titles={categories}
          onSelectCategory={selectCategoryHandler}
        />
        <ArtForm />
        <ArtGallery />
      </ArtProvider>
    </>
  )
}

export default App
