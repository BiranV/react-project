import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialRecipesState = { recipes: [] }

const recipeSlice = createSlice({
    name: "recipes",
    initialState: initialRecipesState,
    reducers: {
        fetch(state) {
            state.recipes = JSON.parse(localStorage.getItem("recipes"))
        },
        add(state, actions) {
            const current = new Date();
            const date = `${ current.getDate() }/${ current.getMonth() + 1 }/${ current.getFullYear() }` + " " + current.getHours() + ":"
                + current.getMinutes() + ":" + current.getSeconds();
            actions.payload.date = date;
            console.log("new: ", actions.payload)
            state.recipes.push(actions.payload)
            localStorage.setItem('recipes', JSON.stringify(state.recipes));
        },
        edit(state, actions) {
            const current = new Date();
            const date = `${ current.getDate() }/${ current.getMonth() + 1 }/${ current.getFullYear() }` + " " + current.getHours() + ":"
                + current.getMinutes() + ":" + current.getSeconds();
            actions.payload.date = date;
            actions.payload.updated = true;
            console.log("edited: ", actions.payload)
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