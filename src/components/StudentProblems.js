import React, { useEffect, useState } from "react"
import { API } from "aws-amplify"
import { DataGrid } from '@material-ui/data-grid';
import { Link } from "react-router-dom"

function StudentProblems({ email }) {
    const [rows, setRows] = useState([])




    const columns = [
        { field: 'id', headerName: 'ID', width: 350 },
        { field: 'problemName', headerName: 'Problem Name', width: 350 },
        { field: 'grade', headerName: 'Grade', width: 350 },
        {
            field: 'problem_id', headerName: 'Submission', width: 300, renderCell: params => (
                <Link to={{
                    pathname: `/submissions/${params.value}`,
                    state: { problem_id: params.value}
                }}><button className="download-button">View Submission</button></Link>
            )
        },
    ]

    useEffect(() => {
        async function getSubmittedProblems() {
            const myInit = {
                queryStringParameters: {
                    email: email
                }
            }
            try {
                let count = 1
                let res = await API.get("studentSubmissionAPI", "/studentSubmission/:email", myInit)
                console.log({ res })
                res = res.map(cv => {
                    cv.id = count++
                    return cv
                })
                setRows(res)
            } catch (e) {
                console.log("errrr", e)
            }
        }

        if (email !== "") getSubmittedProblems()
    }, [email])

    return (
        <div>
            <div style={{ height: 250, width: '90%', marginLeft: "5%", marginTop: "3%" }}>
                <DataGrid rows={rows} columns={columns} pageSize={8} checkboxSelection={false} />
            </div>
        </div>
    )
}

export default StudentProblems