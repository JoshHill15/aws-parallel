import React, { useEffect, useState } from "react"
// import Table from 'react-bootstrap/Table';
import * as ReactBootStrap from "react-bootstrap";
import { Link } from "react-router-dom";
import { DataGrid } from '@material-ui/data-grid';
import { API, Auth } from "aws-amplify"

function StudentProblems() {
    const [email, setEmail] = useState("")

    Auth.currentAuthenticatedUser()
        .then(data => setEmail(data.username))
        .catch(err => console.log(err))


    async function getStudentProblems() {
        const myInit = {
            queryStringParameters: {
                instructor_email: email
            }
        }
        try {
            const res = await API.get("studentProblems", "/studentProblems/:instructor_email", myInit)
        } catch (e) {
            console.log("errrr", e)
        }

    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 350 },
        { field: 'name', headerName: 'Problem Name', width: 350 },
        { field: 'date', headerName: 'Due Date', width: 350 },
        { field: 'status', headerName: 'Problem Status', width: 350 }
    ]
    const rows = [
        { id: '1', name: "Solve this function", date: "05/25/2021", status: "Started" },
        { id: '2', name: "Create this vpc", date: "07/23/2021", status: "Not Started" },
        { id: '3', name: "Setup DynamoDB", date: "07/21/2021", status: "Completed" }
    ]

    useEffect(() => getStudentProblems(), [])

    return (
        <div>
            <div style={{ height: 250, width: '90%', marginLeft: "5%", marginTop: "3%" }}>
                <DataGrid rows={rows} columns={columns} pageSize={8} checkboxSelection={false} />
            </div>
        </div>
    )
}

export default StudentProblems