import { NavLink } from "react-router-dom"

export default function TheHeader() {
    return (
        <nav className="header" >
            <NavLink className="nav-grad" to="/"><h1>React Project - Biran Varon</h1></NavLink>
            <div className="nav-container">
                <p className="nav-page"><NavLink to="/recipes">Recipes</NavLink></p>
                <p className="nav-page"><NavLink to="/expenses">Expenses</NavLink></p>
            </div>  </nav>

    )
}
