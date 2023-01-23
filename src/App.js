import { useState, useEffect } from "react";
import RecipeList from "./components/RecipeList";
import SnackBar from "./components/SnackBar";
import { db } from "./firebase.config";
import { collection, onSnapshot } from "firebase/firestore";

function App() {
  useEffect(() => {
    onSnapshot(collection(db, "recipes"), (snapshot) => {
      setRecipes(
        snapshot.docs.map((doc) => {
          return {
            id: doc.id,
            viewing: false,
            ...doc.data(),
          };
        })
      );
    });
  }, []);
  const [recipes, setRecipes] = useState([]);
  const handleView = (id) => {
    [...recipes].forEach((recipe, key) => {
      if (recipe.id === id) {
        recipe.viewing = !recipe.viewing;
      } else {
        recipe.viewing = false;
      }
    });
    setRecipes([...recipes]);
  };

  const [snackbarActive, setSnackbarActive] = useState({
    show: true,
    text: "",
  });

  const handleSnackbar = (val) => {
    setSnackbarActive({ show: true, text: val });
    setTimeout(() => {
      setSnackbarActive({ show: false, text: "" });
    }, 2000);
  };

  return (
    <div className="App">
      <h1>My recipes</h1>
      <RecipeList recipes={recipes} handleView={handleView}  handleSnackbar={handleSnackbar}  />
      {snackbarActive.show && <SnackBar text={snackbarActive.text} />}
    </div>
  );
}

export default App;
