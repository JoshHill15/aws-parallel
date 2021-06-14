import React, { useEffect, useState } from "react"
import { API } from "aws-amplify"
import { DataGrid } from '@material-ui/data-grid';

function StudentProblems({ email }) {
    const [rows, setRows] = useState([])

    async function getSubmittedProblems() {
        const myInit = {
            queryStringParameters: {
                email: email
            }
    }
    try {
        let count = 1
        let res = await API.get("studentSubmissionAPI", "/studentSubmission/:email", myInit)
        console.log("Look here: ", res);
        res = res.map(cv => {
            cv.id = count++
            console.log("It's working", cv);
            return cv
        })
        setRows(res)
    } catch (e) {
        console.log("errrr", e)
    }

}
    

     const columns = [
        { field: 'id', headerName: 'ID', width: 350 },
        { field: 'name', headerName: 'Problem Name', width: 350 },
        { field: 'status', headerName: 'Problem Status', width: 350 }
    ]
    // const rows = [
    //     { id: '1', name: "Solve this function", status: "Started" },
    //     { id: '2', name: "Create this vpc", date: "07/23/2021", status: "Not Started" },
    //     { id: '3', name: "Setup DynamoDB", date: "07/21/2021", status: "Completed" }
    // ]

    useEffect(() => {
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