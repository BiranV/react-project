import React from "react";
import { useState } from "react";
import { db } from "../firebase.config";
import { storage } from "../firebase.config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "@firebase/storage";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
export default function RecipeList({ recipes, handleView, handleSnackbar }) {
  const [form, setForm] = useState({
    title: "",
    desc: "",
    ingredients: [],
    steps: [],
    image: null,
  });
  const [editMode, setEditMode] = useState(false);
  const [popupActive, setPopupActive] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleAdd = () => {
    setEditMode(false);
    setForm({
      title: "",
      desc: "",
      ingredients: [],
      steps: [],
      image: null,
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
  const handleDelete = async (id, imageUrl) => {
    await deleteDoc(doc(db, "recipes", id));
    const storageRef = ref(storage, imageUrl);
    await deleteObject(storageRef);
    handleSnackbar("removed");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.title ||
      !form.desc ||
      form.ingredients.length < 1 ||
      form.steps.length < 1 ||
      !form.image
    ) {
      alert("Please fill out all fields");
      return;
    } else {
      if (editMode === false) {
        const storageRef = ref(
          storage,
          `/recipes/${Date.now()}${form.image.name}`
        );

        const uploadImage = uploadBytesResumable(storageRef, form.image);
        uploadImage.on(
          "state_changed",
          (snapshot) => {
            const progressPercent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progressPercent);
          },
          (err) => {
            console.log(err);
          },
          () => {
            getDownloadURL(uploadImage.snapshot.ref)
              .then((url) => {
                addDoc(collection(db, "recipes"), {
                  ...form,
                  image: url,
                  viewing: false,
                });
              })
              .then(() => {
                handleSnackbar("added");
                setProgress(0);
                setForm({
                  title: "",
                  desc: "",
                  ingredients: [],
                  steps: [],
                });
                setEditMode(false);
                setPopupActive(false);
              });
          }
        );
      } else {
        if (form.image.name !== undefined) {
          const storageRef = ref(
            storage,
            `/recipes/${Date.now()}${form.image.name}`
          );

          const uploadImage = uploadBytesResumable(storageRef, form.image);
          uploadImage.on(
            "state_changed",
            (snapshot) => {
              const progressPercent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setProgress(progressPercent);
            },
            (err) => {
              console.log(err);
            },
            () => {
              getDownloadURL(uploadImage.snapshot.ref)
                .then((url) => {
                  updateDoc(doc(db, "recipes", form.id), {
                    ...form,
                    image: url,
                    viewing: false,
                  });
                })
                .then(() => {
                  handleSnackbar("edited");
                  setProgress(0);
                  setForm({
                    title: "",
                    desc: "",
                    ingredients: [],
                    steps: [],
                    image: null,
                  });
                  setEditMode(false);
                  setPopupActive(false);
                });
            }
          );
        } else {
          updateDoc(doc(db, "recipes", form.id), {
            ...form,
            viewing: false,
          });
          setForm({
            title: "",
            desc: "",
            ingredients: [],
            steps: [],
            image: null,
          });
          setEditMode(false);
          setPopupActive(false);
        }
      }
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
    <div>
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
                {recipe.image && <img src={recipe.image}></img>}
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
                onClick={() => handleEdit(recipe.id, recipe.image)}
              >
                Edit
              </button>
              <button
                className="remove"
                onClick={() => handleDelete(recipe.id, recipe.image)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        {popupActive && (
          <div className="popup">
            <div className="popup-inner">
              <h2>{editMode ? "Edit" : "Add"} recipe</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    name="title"
                    type="text"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
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
                <input
                  className="input-file"
                  type="file"
                  onChange={(e) =>
                    setForm({ ...form, image: e.target.files[0] })
                  }
                />
                {progress !== 0 && <div>{`uploading image ${progress}%`}</div>}
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
    </div>
  );
}
