import React from "react"
import "../styles/Home.css"
function Home({ problems }) {
    console.log("[roo", problems)
    return (
        <div>
            {problems.map((value, index) => {
                return (
                    <div key={index} className="container-home">
                        <div className="left">
                            <h1 className="problem-name">{value.problemName}</h1>
                            <h3 className="problem-description">{value.textBoxData}</h3>
                        </div>
                        <div>
                            <img className="image" src={value.diagram} alt="image"/>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default Home