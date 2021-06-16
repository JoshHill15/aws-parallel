import React, { useEffect, useState } from "react"
import { DataGrid } from '@material-ui/data-grid';
import { API } from "aws-amplify"
import "../styles/InstructorStudents.css"

function InstructorsStudents({ email }){
    const [rows, setRows] = useState([])



    const downloadFile = async (myData) => {
        const fileName = "CFFILE";
        const json = JSON.stringify(myData);
        const blob = new Blob([json],{type:'application/json'});
        const href = await URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'studentsName', headerName: 'Students Name', width: 250 },
        { field: 'problemName', headerName: 'Problem Name', width: 250 },
        { field: 'grade', headerName: 'Grade', width: 250 },
        { field: 'instructorReview', headerName: 'Review', width: 200 },
        { field: 'submission', headerName: 'Submission', width: 300, renderCell: params => (
            <button className="download-button" onClick={e => downloadFile(params.value)}>Download File</button>
       )},
      ];

    useEffect(() => {
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
                setRows(res)
            } catch (e) {
                console.log("errrr", e)
            }
    
        }

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