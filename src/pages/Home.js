export default function Home() {
    return (
        <header className="home-app">
            <div className="home-container">
                <h1 style={{ textDecoration: "underline" }}>Welcome to my React project</h1>
                <div style={{ fontSize: "18px" }}>Here you can find two apps: a recipe book and an expense calculator.
                    <br />
                    Each of the apps can be accessed via a navigation bar at the top.
                    <br />
                    <br />
                    <p style={{ textDecoration: "underline", fontSize: "22px" }}>Technologies included:</p>
                    React, React Router, Redux, Local Storage and Firebase.
                </div>
            </div>
            <div className="home-container">
                <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                    Created by: Biran Varon.
                    <p><a href="https://github.com/BiranV" target="_blank" rel="noreferrer" > <button className="add" >GitHub</button></a></p>
                </div>
            </div>
        </header>
    )
}
