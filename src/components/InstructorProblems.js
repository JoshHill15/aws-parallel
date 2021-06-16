import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { DataGrid } from '@material-ui/data-grid';
import "../styles/InstructorProblems.css"
import { API, Storage } from "aws-amplify"



function InstructorProblems({ email }) {
    const [rows, setRows] = useState([])



    useEffect(() => {
        async function getInstructorProblems() {
            const myInit = {
                queryStringParameters: {
                    instructor_email: email
                }
            }
            try {
                let count = 1
                let res = await API.get("instructorProblems", "/instructorProblems/:instructor_email", myInit)
                res = await Promise.all(res.map(async cv => {
                    cv.id = count++
                    cv.diagram = await Storage.get(cv.diagramName)
                    return cv
                }))
                console.log({ res })
                setRows(res)
            }
            catch (err) {
                console.error("err: ", err)
    
            }
        }

        if (email !== "") getInstructorProblems()
    }, [email])


    const columns = [
        { field: 'id', headerName: 'ID', width: 125 },
        { field: 'problemName', headerName: 'Problem Name', width: 300 },
        { field: 'textBoxData', headerName: 'Problem Description', width: 300 },
        {
            field: 'diagram', headerName: 'Diagram', width: 300, renderCell: params => (
                <img src={params.value} key={params.value} alt="diagram"/>
            )
        }
    ];

    return (
        <div>
            <div className="createProblemContainer">
                <Link to="problems/create-problem">
                    <button className="createProblem">Create Problem</button>
                </Link>
            </div>
            <div style={{ height: 650, width: '90%', marginLeft: "5%" }}>
                <DataGrid rowHeight={100} rows={rows} columns={columns} pageSize={8} checkboxSelection={false} />
            </div>
        </div>
    )
}
export default InstructorProblems