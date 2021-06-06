import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { DataGrid } from '@material-ui/data-grid';
import "../styles/InstructorProblems.css"
import { API } from "aws-amplify"

function InstructorProblems(){

    async function getInstructorProblems(){
        const myInit = {
            queryStringParameters: {
                instructor_email: "josh_hill15@me.com"
            }
        }
        try {
            const res = await API.get("instructorProblems", "/instructorProblems/:instructor_email", myInit)
            console.log({res})
        }
        catch(err) {
            console.error("err: ", err)

        }
    }

    async function getInstructorProblem(){
        const myInit = {
            queryStringParameters: {
                instructor_email: "josh_hill15@me.com",
                problemID: 2
            }
        }
        try {
            const result = await API.get("instructorProblems", "/instructorProblems/object/:instructor_email/:problemID", myInit)
            console.log({result})
        }
        catch(err) {
            console.error("err: ", err)
        }
    }

    useEffect(() => getInstructorProblems(),[])
    useEffect(() => getInstructorProblem(),[])



    const columns = [
        { field: 'id', headerName: 'ID', width: 125 },
        { field: 'problemName', headerName: 'Problem Name', width: 300 },
        { field: 'problemDescription', headerName: 'Problem Description', width: 300 },
        { field: 'diagram', headerName: 'Diagram', width: 300 }
      ];
      const rows = [
        { id: 1, problemName: 'first prob', problemDescription: 'desc', diagram: "link to diagram"},
        { id: 2, problemName: 'Lannister', problemDescription: 'Cersei', diagram: 42 },
        { id: 3, problemName: 'Lannister', problemDescription: 'Jaime', diagram: 45 },
        { id: 4, problemName: 'Stark', problemDescription: 'Arya', diagram: 16 },
        { id: 5, problemName: 'Targaryen', problemDescription: 'Daenerys', diagram: null },
        { id: 6, problemName: 'Melisandre', problemDescription: null, diagram: 150 },
        { id: 7, problemName: 'Clifford', problemDescription: 'Ferrara', diagram: 44 },
        { id: 8, problemName: 'Frances', problemDescription: 'Rossini', diagram: 36 },
        { id: 9, problemName: 'Roxie', problemDescription: 'Harvey', diagram: 65 },
      ];
    return (
        <div>
            <div className="createProblemContainer">
                <Link to="problems/create-problem">
                    <button className="createProblem">Create Problem</button>
                </Link>
            </div>
            <div style={{ height: 550, width: '90%', marginLeft: "5%"}}>
                <DataGrid rows={rows} columns={columns} pageSize={8} checkboxSelection={false} />
            </div>
        </div>
    )
}
export default InstructorProblems