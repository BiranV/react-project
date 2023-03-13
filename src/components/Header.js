import { NavLink } from "react-router-dom"
import Image from "../assets/preview1.png"

export default function TheHeader() {

    return (
        <nav style={{ backgroundImage: `url(${ Image })`, backgroundSize: 'cover' }}>
            <NavLink style={{ textTransform: "uppercase", fontSize: "1.5rem", background: "transparent", color: "#FFFFFF" }} to="/">React Project - Biran Varon</NavLink>
            <div style={{ marginRight: "2rem" }}>
                <NavLink style={{ border: "1px solid white", marginRight: "0.5rem" }} className={(navData) => navData.isActive ? "active" : ""} to="/recipes">Recipes</NavLink>
                <NavLink style={{ border: "1px solid white", marginLeft: "0.5rem" }} className={(navData) => navData.isActive ? "active" : ""} to="/expenses">Expenses</NavLink>
            </div>
        </nav>

    )
}
