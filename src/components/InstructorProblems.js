import React from "react"
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom"
import poke from "../pics/Poke_receipt.jpg"

function InstructorProblems(){
    const problems = [
        { name: "Solve this function", description: "05/25/2021", diagram: <image src={poke} alt="poke"/>},
        { name: "Create this vpc", description: "07/23/2021", diagram: "Not Started" },
        { name: "Setup DynamoDB", description: "07/21/2021", diagram: "Completed"}
    ]

    const renderProblem = (problem, index) => {
        return (

            <tr key={index}>
                <td>{problem.name}</td>
                <td>{problem.description}</td>
                <td>{problem.diagram}</td>
            </tr>
        )
    }

    return (
        <div>
            <Link to="problems/create-problem">
                <button>Create Problem</button>
            </Link>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>description</th>
                        <th>diagram</th>
                    </tr>
                </thead>
                <tbody>
                   {problems.map(renderProblem)}
                </tbody>
            </Table>
        </div>
    )
}

export default InstructorProblems