
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Root from "./components/Root"
import Home from "./pages/Home"
import Recipes from "./pages/Recipes/Recipes"
import Expenses from "./pages/Expenses/Expenses"
import MemoryGame from "./pages/MemoryGame/MemoryGame"
import "./index.css";
import { Provider } from "react-redux";
import store from './store/index';

const router = createBrowserRouter([
    {
        path: "/", element: <Root />, children: [
            { path: "/", element: <Home /> },
            { path: "/recipes", element: <Recipes /> },
            { path: "/expenses", element: <Expenses /> },
            { path: "/memory-game", element: <MemoryGame /> },
        ]
    }
])
export default function App() {
    return (
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    )
}
