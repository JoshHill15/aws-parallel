import React from "react"
import "../styles/Home.css"
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'

function Home({ problems }) {
    
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
                            <img className="image" src={value.diagram} alt="alternate"/>
                        </div> &nbsp;&nbsp;
                        <div>
                            <Link 
                            to={{
                                pathname: `/problem/${value.problemID}`,
                                state: { value : value }
                            }}
                            >
                                <Button variant="primary">View</Button>
                            </Link>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default Home