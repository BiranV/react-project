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
  const [recipes, setRecipes] = useState([]);
  const [form, setForm] = useState({
    title: "",
    desc: "",
    ingredients: [],
    steps: [],
  });
  const [editActive, setEditActive] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [popupActive, setPopupActive] = useState(false);

  const recipesCollecionRef = collection(db, "recipes");

  useEffect(() => {
    onSnapshot(recipesCollecionRef, (snapshot) => {
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

  const handleView = (id) => {
    const recipeClone = [...recipes];
    recipeClone.forEach((recipe, key) => {
      if (recipe.id === id) {
        recipe.viewing = !recipe.viewing;
      } else {
        recipe.viewing = false;
      }
    });
    setRecipes(recipeClone);
  };

  const handleEdit = (id) => {
    const recipeClone = [...recipes];
    recipeClone.forEach((recipe, key) => {
      if (recipe.id === id) {
        setEditForm({ ...recipe });
        setEditActive(true);
      }
    });
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
      addDoc(recipesCollecionRef, form);
    }

    setForm({
      title: "",
      desc: "",
      ingredients: [],
      steps: [],
    });
    setPopupActive(false);
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (
      !editForm.title ||
      !editForm.desc ||
      editForm.ingredients.length < 1 ||
      editForm.steps.length < 1
    ) {
      alert("Please fill out all fields");
      return;
    } else {
      updateDoc(doc(db, "recipes", editForm.id), editForm);
    }
    setEditActive(false);
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

  const removeRecipe = (id) => {
    deleteDoc(doc(db, "recipes", id));
  };
  //from here
  const handleEditIngredient = (e, index) => {
    const ingredientsClone = [...editForm.ingredients];
    ingredientsClone[index] = e.target.value;
    setEditForm({
      ...editForm,
      ingredients: ingredientsClone,
    });
  };
  const handleEditStep = (e, index) => {
    const stepssClone = [...editForm.steps];
    stepssClone[index] = e.target.value;
    setEditForm({
      ...form,
      steps: stepssClone,
    });
  };
  const handleEditIngredientCount = () => {
    setEditForm({ ...editForm, ingredients: [...editForm.ingredients, ""] });
  };

  const handleEditStepCount = () => {
    setEditForm({ ...editForm, steps: [...editForm.steps, ""] });
  };

  return (
    <div className="App">
      <h1>My recipes</h1>
      <button onClick={() => setPopupActive(!popupActive)}>Add recipe</button>
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
                onClick={() => removeRecipe(recipe.id)}
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
            <h2>Add a new recipe</h2>
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
                  type="submit"
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
      {editActive && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Edit recipe</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  type="text"
                  value={editForm.desc}
                  onChange={(e) =>
                    setEditForm({ ...editForm, desc: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Ingredients</label>
                {editForm.ingredients.map((ingredient, index) => (
                  <input
                    type="text"
                    key={index}
                    value={ingredient}
                    onChange={(e) => handleEditIngredient(e, index)}
                  />
                ))}
                <button
                  type="button"
                  className="button-view"
                  onClick={handleEditIngredientCount}
                >
                  Add igredient
                </button>
              </div>
              <div className="form-group">
                <label>Steps</label>
                {editForm.steps.map((step, index) => (
                  <input
                    type="text"
                    key={index}
                    value={step}
                    onChange={(e) => handleEditStep(e, index)}
                  />
                ))}
                <button
                  type="button"
                  className="button-view"
                  onClick={handleEditStepCount}
                >
                  Add step
                </button>
              </div>
              <div className="buttons">
                <button type="submit" className="submit">
                  Submit
                </button>
                <button
                  type="submit"
                  className="remove"
                  onClick={() => setEditActive(false)}
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
