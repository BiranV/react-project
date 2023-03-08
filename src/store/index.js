import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialRecipesState = { recipes: [] }

const recipeSlice = createSlice({
    name: "recipes",
    initialState: initialRecipesState,
    reducers: {
        fetch(state) {
            const initialData = JSON.parse(localStorage.getItem("recipes"));
            if (initialData) {
                state.recipes = initialData;
            }
        },
        add(state, actions) {
            const current = new Date();
            const date = `${ current.getDate() }/${ current.getMonth() + 1 }/${ current.getFullYear() }` + " " + current.getHours() + ":"
                + current.getMinutes() + ":" + current.getSeconds();
            actions.payload.date = date;
            state.recipes.push(actions.payload)
            localStorage.setItem('recipes', JSON.stringify(state.recipes));
        },
        edit(state, actions) {
            const current = new Date();
            const date = `${ current.getDate() }/${ current.getMonth() + 1 }/${ current.getFullYear() }` + " " + current.getHours() + ":"
                + current.getMinutes() + ":" + current.getSeconds();
            actions.payload.date = date;
            actions.payload.updated = true;
            actions.payload.viewing = false;
            state.recipes = state.recipes.map(el => el.id !== actions.payload.id ? el : actions.payload);
            localStorage.setItem('recipes', JSON.stringify(state.recipes));
        },
        delete(state, actions) {
            state.recipes = state.recipes.filter((item) => item.id !== actions.payload)
            localStorage.setItem('recipes', JSON.stringify(state.recipes));
        },
        view(state, actions) {
            state.recipes.forEach((recipe) => {
                if (recipe.id === actions.payload) {
                    recipe.viewing = !recipe.viewing
                } else { recipe.viewing = false };
            });
        },
    }
})

const store = configureStore({
    reducer:
        recipeSlice.reducer
})
export const recipesActions = recipeSlice.actions;
export default store;