import React from "react"
import { DataGrid } from '@material-ui/data-grid';
const columns = [
    { field: 'id', headerName: 'ID', width: 125 },
    { field: 'studentName', headerName: 'Students Name', width: 350 },
    { field: 'problemName', headerName: 'Problem Name', width: 350 },
    { field: 'submission', headerName: 'Submission', width: 350 }
  ];
  const rows = [
    { id: 1, studentName: 'josh', problemName: 'desc', submission: "link to submission"},
    { id: 2, studentName: 'Lannister', problemName: 'Cersei', submission: 42 },
    { id: 3, studentName: 'Lannister', problemName: 'Jaime', submission: 45 },
    { id: 4, studentName: 'Stark', problemName: 'Arya', submission: 16 },
    { id: 5, studentName: 'Targaryen', problemName: 'Daenerys', submission: null },
    { id: 6, studentName: 'Melisandre', problemName: null, submission: 150 },
    { id: 7, studentName: 'Clifford', problemName: 'Ferrara', submission: 44 },
    { id: 8, studentName: 'Frances', problemName: 'Rossini', submission: 36 },
    { id: 9, studentName: 'Roxie', problemName: 'Harvey', submission: 65 },
  ];
function InstructorsStudents(){
    return (
        <div>
            <div style={{ height: 550, width: '90%', marginLeft: "5%", marginTop: "3%"}}>
                <DataGrid rows={rows} columns={columns} pageSize={8} checkboxSelection={false} />
            </div>  
        </div>
    )
}
export default InstructorsStudents