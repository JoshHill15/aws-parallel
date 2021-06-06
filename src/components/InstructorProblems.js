import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { DataGrid } from '@material-ui/data-grid';
import "../styles/InstructorProblems.css"
import { API, Auth, Storage } from "aws-amplify"

function InstructorProblems(){
    const [email, setEmail] = useState("")
    const [images, setImages] = useState([])
    
    async function getDiagrams() {
        let imageKeys = await Storage.list("")
        imageKeys = await Promise.all(imageKeys.map(async k => {
            const signedURL = await Storage.get(k.key)
            return signedURL
        }))
        setImages(imageKeys)
    }

    Auth.currentAuthenticatedUser()
        .then(data => setEmail(data.username))
        .catch(err => console.log(err))

    async function getInstructorProblems(){
        const myInit = {
            queryStringParameters: {
                instructor_email: email
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

    useEffect(() => {
        if (email !== "") getInstructorProblems()
    },[email])
    useEffect(() => getInstructorProblem(),[])
    useEffect(() => getDiagrams(),[])


    const columns = [
        { field: 'id', headerName: 'ID', width: 125 },
        { field: 'problemName', headerName: 'Problem Name', width: 300 },
        { field: 'problemDescription', headerName: 'Problem Description', width: 300 },
        { field: 'diagram', headerName: 'Diagram', width: 300 },
        { field: 'other', height: 900, headerName: 'other', width: 300, renderCell: params => (
            <img src={params.value} key={params.value} style={{height: 200}} />
        )}
      ];
      const rows = [
        { id: 1, problemName: 'first prob', problemDescription: 'desc', diagram: <img src={images[0]} style={{height: 200, width: 200}} />},
        { id: 2, problemName: 'Lannister', problemDescription: 'Cersei', diagram: <a href={images[0]}>link</a> },
        { id: 3, problemName: 'Lannister', problemDescription: 'Jaime', diagram: 45, other: images[0]},
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