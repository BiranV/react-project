export default function Home() {
    return (
        <div className="home-app">
            <div className="card">
                <h2 className="title" style={{ textDecoration: "underline" }}>Welcome to my React project</h2>
                <p>Here you can find two apps: a recipe book and an expense calculator.
                    <p>Each of the apps can be accessed via a navigation bar at the top. </p>
                    <br />
                    <p>Technologies included:</p>
                    <p>React, React Router, Redux, Local Storage and Firebase.</p>
                </p>
            </div>
            <div className="cards-flex">
                <div className="card" style={{ marginRight: '0.25rem' }}><h2>Recipes</h2>
                    <h4 style={{ marginTop: '1.5rem' }}>An app for recipes</h4></div>
                <div className="card" style={{ marginLeft: '0.25rem' }}><h2>Expenses</h2>
                    <h4 style={{ marginTop: '1.5rem' }}>An application for calculating expenses</h4>
                </div>
            </div>
            <div className="card">
                <h3>Full Name: Biran Varon</h3>
                <h3>Mobile: 0507780228</h3>
                <a href="https://github.com/BiranV" target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}> <button className="add" >GitHub</button></a>
            </div>

        </div>
    )
}
