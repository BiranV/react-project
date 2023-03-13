import { NavLink } from "react-router-dom"
import Image from "../assets/preview1.png"

export default function TheHeader() {
    
    return (
        <nav className="header" style={{ backgroundImage: `url(${ Image })`, backgroundSize: 'cover' }}>
            <NavLink to="/"><h1 className="title">React Project - Biran Varon</h1></NavLink>
            <div className="nav-container">
                <NavLink className="nav-page" activeClassName="active" to="/recipes">Recipes</NavLink>
                <NavLink className="nav-page" activeClassName="active" to="/expenses">Expenses</NavLink>
            </div>
        </nav>

    )
}
