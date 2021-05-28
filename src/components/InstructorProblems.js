import React from "react"
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom"

function InstructorProblems(){

    return (
        <div>
            <Link to="problems/create-problem">
                <button>Create Problem</button>
            </Link>

                <Table variant="dark">
                 <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                 </thead>
                 <tbody>
                    <tr>
                        <td>1</td>
                        {Array.from({ length: 2 }).map((_, index) => (
                        <td key={index}>Problem {index + 1}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>2</td>
                        {Array.from({ length: 2 }).map((_, index) => (
                        <td key={index}>Table cell {index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>3</td>
                        {Array.from({ length: 2 }).map((_, index) => (
                        <td key={index}>Table cell {index}</td>
                        ))}
                    </tr>
                </tbody>
                </Table>
        </div>
    )
}

export default InstructorProblems