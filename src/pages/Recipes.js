import { useState, useEffect } from "react";
import Snackbar from "../components/Snackbar";
import { useDispatch, useSelector } from "react-redux";
import { recipesActions } from "../store/index"
import { v4 as uuid } from 'uuid';

export default function Recipes() {

    const dispatch = useDispatch()
    const recipes = useSelector((state) => state.recipes)

    const [form, setForm] = useState({
        id: "",
        title: "",
        ingredients: [],
        steps: [],
        image: null,
        viewing: false,
    });
    const [editMode, setEditMode] = useState(false);
    const [popupActive, setPopupActive] = useState(false);
    const [snackbarActive, setSnackbarActive] = useState({
        show: false,
        text: "",
    });

    useEffect(() => {
        dispatch(recipesActions.fetch())
    }, []);

    const handleAdd = () => {
        setEditMode(false);
        setForm({
            id: "",
            title: "",
            ingredients: [],
            steps: [],
            image: null,
            viewing: false
        });
        setPopupActive(true);
    };
    const handleEdit = (id) => {
        [...recipes].forEach((recipe) => {
            if (recipe.id === id) {
                setForm({ ...recipe });
                setEditMode(true);
                setPopupActive(true);
            }
        });
    };
    const handleDelete = (id) => {
        dispatch(recipesActions.delete(id));
        handleSnackbar("Deleted");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !form.title ||
            form.ingredients.length < 1 ||
            form.steps.length < 1
            || !form.image
        ) {
            alert("Please fill out all fields");
            return;
        } else {
            const exist = [...recipes].filter((item => item.id === form.id))
            if (exist.length > 0) {
                dispatch(recipesActions.edit({ ...form }))
                setForm({
                    id: "",
                    title: "",
                    ingredients: [],
                    steps: [],
                    image: null,
                    viewing: false
                });
                setPopupActive(false);
                handleSnackbar("Edited")
            } else {
                dispatch(recipesActions.add({ ...form, id: uuid() }))
                setForm({
                    id: "",
                    title: "",
                    ingredients: [],
                    steps: [],
                    image: null,
                    viewing: false
                });
                setPopupActive(false);
                handleSnackbar("Added")
            }
        }
    };

    const handleImageUpload = (event) => {
        const selectedImage = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setForm({ ...form, image: reader.result });
        };
        reader.readAsDataURL(selectedImage);
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
        const stepsClone = [...form.steps];
        stepsClone[index] = e.target.value;
        setForm({
            ...form,
            steps: stepsClone,
        });
    };
    const handleIngredientCount = () => {
        setForm({ ...form, ingredients: [...form.ingredients, ""] });
    };

    const handleStepCount = () => {
        setForm({ ...form, steps: [...form.steps, ""] });
    };

    const handleSnackbar = (val) => {
        setSnackbarActive({ show: true, text: val });
        setTimeout(() => {
            setSnackbarActive({ show: false, text: "" });
        }, 2000);
    };
    return (
        <div className="app-recipes">
            <div className="title-page">
                <h1>Recipes</h1>
            </div>
            <button className="add" onClick={handleAdd}>Add recipe</button>
            <div>
                {recipes.map((recipe, index) => (
                    <div className="recipe" key={recipe.id}>
                        <h3>{recipe.title}</h3>
                        <div className="updated"> {recipe.updated ? <p>Updated: {recipe.date}</p> : <p>Created: {recipe.date}</p>} </div>
                        {recipe.viewing && (
                            <div>
                                <label>Ingredients</label>
                                <ul>
                                    {recipe.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                                <label>Steps</label>
                                <ol>
                                    {recipe.steps.map((step, index) => (
                                        <li key={index}>{step}</li>
                                    ))}
                                </ol>
                                {recipe.image && <img src={recipe.image} alt="uploaded img"></img>}
                            </div>
                        )}
                        <div className="buttons-recipes">
                            <button
                                className="view"
                                onClick={() => dispatch(recipesActions.view(recipe.id))}
                            >
                                View {recipe.viewing ? "less" : "more"}
                            </button>
                            <button
                                className="edit"
                                onClick={() => handleEdit(recipe.id, recipe.image)}
                            >
                                Edit
                            </button>
                            <button
                                className="delete"
                                onClick={() => handleDelete(recipe.id)}
                            >
                                Delete
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
                                        className="view"
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
                                        className="view"
                                        onClick={handleStepCount}
                                    >
                                        Add step
                                    </button>
                                </div>
                                <input
                                    className="inputfile"
                                    type="file"
                                    onChange={handleImageUpload}
                                />
                                <div className="buttons-recipes">
                                    <button type="submit" className="submit">
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        className="delete"
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
            {snackbarActive.show && <Snackbar text={snackbarActive.text} />}
        </div>
    );
}
