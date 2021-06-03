import React from "react"
import {DataGrid} from '@material-ui/data-grid'

function Problem(){
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'problem', headerName: 'Problem Statement', width: 150 },
        { field: 'date', headerName: 'Due Date', width: 150 },
        { field: 'status', headerName: 'Status', width: 150 }
    ];

    const rows = [
        { id: 1, problem: 'Create this vpc', date: '09/21/2021', status: 'Not Started'}

    ]
    return (
        <div style={{ display: 'flex' }}>
            
            <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
        </div>
    )
}

export default Problem