import React from "react"
// import Table from 'react-bootstrap/Table';
import * as ReactBootStrap from "react-bootstrap";
import { Link } from "react-router-dom";
import { DataGrid } from '@material-ui/data-grid';

function StudentProblems() {
    const columns = [
        {field: 'id', headerName: 'ID', width: 350},
        {field: 'name', headerName: 'Problem Name', width: 350},
        {field: 'date', headerName: 'Due Date', width: 350},
        {field: 'status', headerName: 'Problem Status', width: 350}
    ]
    const rows = [
        { id: '1', name: "Solve this function", date: "05/25/2021", status: "Started" },
        { id: '2', name: "Create this vpc", date: "07/23/2021", status: "Not Started" },
        { id:'3', name: "Setup DynamoDB", date: "07/21/2021", status: "Completed"}
    ]

    // const renderProblem = (problem, index) => {
    //     return (

    //         <tr key={index}>
    //             <td>{problem.name}</td>
    //             <td>{problem.date}</td>
    //             <td>{problem.status}</td>
    //         </tr>
    //     )
    // }
    return (
        <div>
           <div style={{ height: 250, width: '90%', marginLeft: "5%", marginTop: "3%"}}>
                <DataGrid rows={rows} columns={columns} pageSize={8} checkboxSelection={false} />
            </div>
        </div>
    )
}

export default StudentProblems