import React, { useEffect, useState } from "react"
import { DataGrid } from '@material-ui/data-grid';
import { API } from "aws-amplify"
import { propTypes } from "react-bootstrap/esm/Image";


function InstructorsStudents({ email }){
    const [rows, setRows] = useState([])

    async function getStudentProblems() {
        const myInit = {
            queryStringParameters: {
                instructor_email: email
            }
        }
        try {
            let count = 1
            let res = await API.get("studentProblems", "/studentProblems/:instructor_email", myInit)
            res = res.map(cv => {
                cv.id = count++
                return cv
            })
            console.log("Student",res)
            setRows(res)
        } catch (e) {
            console.log("errrr", e)
        }

    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'studentsName', headerName: 'Students Name', width: 250 },
        { field: 'problemName', headerName: 'Problem Name', width: 250 },
        { field: 'submission', headerName: 'Submission', width: 250 },
        { field: 'grade', headerName: 'Grade', width: 250 },
        { field: 'instructorReview', headerName: 'Review', width: 200 }
      ];

    useEffect(() => {
        if (email !== "") getStudentProblems()
    }, [email])

    return (
        <div>
            <div style={{ height: 550, width: '90%', marginLeft: "5%", marginTop: "3%"}}>
                <DataGrid rows={rows} columns={columns} pageSize={8} checkboxSelection={false} />
            </div>  
        </div>
    )
}
export default InstructorsStudents