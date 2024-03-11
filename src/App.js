import './App.css';
import Header from './components/Header';
import Search from './components/Search';
import FeaturedRecipes from './components/FeaturedRecipes';
import RecipeCategories from './components/RecipeCategories';

function App() {
  return (
    <div className="App">
      <Header />
      <Search />
      <FeaturedRecipes />
      <RecipeCategories />
    </div>
  );
}

export default App;
