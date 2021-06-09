import React from "react"
import "../styles/Home.css"
import Button from 'react-bootstrap/Button'

function Home({ problems }) {
    console.log("[roo", problems)
    return (
        <div>
            {problems.map((value, index) => {
                return (
                    <div key={index} className="container-home">
                        <div className="left">
                            <p className="problem-name">{value.problemName}</p>
                            <p className="problem-description">{value.textBoxData}</p>
                        </div>
                        <div>
                            <img className="image" src={value.diagram} alt="image"/>
                        </div> &nbsp;&nbsp;
                        <div>
                            <Button variant="primary">View</Button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default Home