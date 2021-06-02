import React from "react"
// import Table from 'react-bootstrap/Table';
import * as ReactBootStrap from "react-bootstrap";
import { DataGrid } from '@material-ui/data-grid';

function StudentProblems() {
    const problems = [
        { name: "Solve this function", date: "05/25/2021", status: "Started" },
        { name: "Create this vpc", date: "07/23/2021", status: "Not Started" },
        { name: "Setup DynamoDB", date: "07/21/2021", status: "Completed"}
    ]

    const renderProblem = (problem, index) => {
        return (

            <tr key={index}>
                <td>{problem.name}</td>
                <td>{problem.date}</td>
                <td>{problem.status}</td>
            </tr>
        )
    }
    return (
        <div>
            <ReactBootStrap.Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date Due</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                   {problems.map(renderProblem)}
                </tbody>
            </ReactBootStrap.Table>
        </div>
    )
}

export default StudentProblems