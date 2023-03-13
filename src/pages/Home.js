import { SlBookOpen } from "react-icons/sl";
import { BiDollar } from "react-icons/bi";

export default function Home() {
    return (
        <div className="home-app">
            <div className="card">
                <h2 className="title">Welcome to my React project</h2>
                <p>Here you can find two apps: a recipe book and an expense calculator.
                    <p>Each of the apps can be accessed via a navigation bar at the top or from the tabs below.</p>
                    <br />
                    <p>Technologies included:</p>
                    <p>React, React Router, Redux, Local Storage and Firebase.</p>
                </p>
            </div>
            <div className="cards-flex">
                <div className="card" style={{ marginRight: '0.25rem' }}><h2>Recipes</h2>
                    <h2 style={{ marginTop: '1rem' }}><SlBookOpen /></h2>
                </div>
                <div className="card" style={{ marginLeft: '0.25rem' }}><h2>Expenses</h2>
                    <h2 style={{ marginTop: '1rem' }}><BiDollar /></h2>
                </div>
            </div>
            <div className="card">
                <h3>Full Name: Biran Varon</h3>
                <h3>Mobile: 0507780228</h3>
                <div className="contact">
                    <a href="mailto:biraniv@gmail.com" style={{ textDecoration: 'none' }}> <button className="email" >Email</button></a>
                    <a href="https://github.com/BiranV" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}> <button className="github">GitHub</button></a>
                </div>
            </div>

        </div>
    )
}
