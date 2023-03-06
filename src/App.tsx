import "./App.css";

import Categories from "./components/Categories/Categories";
import ArtsProvider from "./context/ArtsContext";
import ArtGallery from "./components/Arts/ArtGallery";
import ArtForm from "./components/ArtForm/ArtForm";

const categories = ["lol", "kek"];
const selectCategoryHandler = (selectedCategory: string) => {
  const category = {
    selectedCategory,
    id: Math.random().toString()
  }
  console.log(category)
}

function App() {
  return (
    <ArtsProvider>
      <Categories titles={categories} onSelectCategory={selectCategoryHandler}/>
      <ArtForm />
      <ArtGallery />
    </ArtsProvider>
  );
}

export default App;
