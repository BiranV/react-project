import { db } from "./firebase.config";
import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

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
  const [form, setForm] = useState({
    title: "",
    desc: "",
    ingredients: [],
    steps: [],
  });
  const [editMode, setEditMode] = useState(false);
  const [popupActive, setPopupActive] = useState(false);

  const handleAdd = () => {
    setEditMode(false);
    setForm({
      title: "",
      desc: "",
      ingredients: [],
      steps: [],
    });
    setPopupActive(true);
  };
  const handleEdit = (id) => {
    [...recipes].forEach((recipe, key) => {
      if (recipe.id === id) {
        setForm({ ...recipe });
        setEditMode(true);
        setPopupActive(true);
      }
    });
  };
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
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.title ||
      !form.desc ||
      form.ingredients.length < 1 ||
      form.steps.length < 1
    ) {
      alert("Please fill out all fields");
      return;
    } else {
      if (editMode === false) {
        addDoc(collection(db, "recipes"), form);
      } else {
        updateDoc(doc(db, "recipes", form.id), form);
      }
      setForm({
        title: "",
        desc: "",
        ingredients: [],
        steps: [],
      });
      setEditMode(false);
      setPopupActive(false);
    }
  };
  const handleIngredient = (e, index) => {
    const ingredientsClone = [...form.ingredients];
    ingredientsClone[index] = e.target.value;
    setForm({
      ...form,
      ingredients: ingredientsClone,
    });
  };
  const handleStep = (e, index) => {
    const stepssClone = [...form.steps];
    stepssClone[index] = e.target.value;
    setForm({
      ...form,
      steps: stepssClone,
    });
  };
  const handleIngredientCount = () => {
    setForm({ ...form, ingredients: [...form.ingredients, ""] });
  };

  const handleStepCount = () => {
    setForm({ ...form, steps: [...form.steps, ""] });
  };

  return (
    <div className="App">
      <h1>My recipes</h1>
      <button onClick={handleAdd}>Add recipe</button>
      <div className="recipes">
        {recipes.map((recipe, index) => (
          <div className="recipe" key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p dangerouslySetInnerHTML={{ __html: recipe.desc }}></p>
            {recipe.viewing && (
              <div>
                <h4>Ingredients</h4>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <h4>Steps</h4>
                <ol>
                  {recipe.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
            <div className="buttons">
              <button
                className="button-view"
                onClick={() => handleView(recipe.id)}
              >
                View {recipe.viewing ? "less" : "more"}
              </button>
              <button
                className="button-edit"
                onClick={() => handleEdit(recipe.id)}
              >
                Edit
              </button>
              <button
                className="remove"
                onClick={() => deleteDoc(doc(db, "recipes", recipe.id))}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      {popupActive && (
        <div className="popup">
          <div className="popup-inner">
            <h2>{editMode ? "Edit" : "Add"} recipe</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  type="text"
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Ingredients</label>
                {form.ingredients.map((ingredient, index) => (
                  <input
                    type="text"
                    key={index}
                    value={ingredient}
                    onChange={(e) => handleIngredient(e, index)}
                  />
                ))}
                <button
                  type="button"
                  className="button-view"
                  onClick={handleIngredientCount}
                >
                  Add igredient
                </button>
              </div>
              <div className="form-group">
                <label>Steps</label>
                {form.steps.map((step, index) => (
                  <input
                    type="text"
                    key={index}
                    value={step}
                    onChange={(e) => handleStep(e, index)}
                  />
                ))}
                <button
                  type="button"
                  className="button-view"
                  onClick={handleStepCount}
                >
                  Add step
                </button>
              </div>
              <div className="buttons">
                <button type="submit" className="submit">
                  Submit
                </button>
                <button
                  type="button"
                  className="button-clear"
                  onClick={() =>
                    setForm({
                      title: "",
                      desc: "",
                      ingredients: [],
                      steps: [],
                    })
                  }
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="remove"
                  onClick={() => setPopupActive(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
