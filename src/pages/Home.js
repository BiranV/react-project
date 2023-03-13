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
                    <br/>  </div>
            </div>
            <div className="home-container-pages">
                <div className="home-container" style={{marginRight: '0.25rem'}}><h2>Recipes</h2>
                    <h4>An app for recipes</h4></div>
                <div className="home-container" style={{marginLeft: '0.25rem'}}><h2>Expenses</h2>
                    <h4>An application for calculating expenses</h4>
                    <br/>
                    </div>
            </div>
            <div className="home-container">
                <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                    Created by: Biran Varon.
                    <p><a href="https://github.com/BiranV" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}> <button className="add" >GitHub</button></a></p>
                </div>
            </div>

        </header>
    )
}
