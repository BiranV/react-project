import { NavLink } from "react-router-dom"

export default function TheHeader() {
    return (
        <nav className="header" >
            <NavLink to="/"><h1>React Project - Biran Varon</h1></NavLink>
            <div className="nav-container">
                <NavLink className="nav-page" style={({ isActive }) => isActive ? { border: '1px solid #ffffff' } : null} to="/recipes">Recipes</NavLink>
                <NavLink className="nav-page" style={({ isActive }) => isActive ? { border: '1px solid #ffffff' } : null} to="/expenses">Expenses</NavLink>
            </div>
        </nav>

    )
}
