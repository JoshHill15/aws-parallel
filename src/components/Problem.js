import React, { useRef, useState, useEffect } from "react"
import { Form } from 'react-bootstrap';
import { API, Storage } from "aws-amplify"
import Image from 'react-bootstrap/Image';
import { Row, Col, Container } from 'react-bootstrap';
import StudentProblemPage from './StudentProblemPage';
import InstructorProblemPage from './InstructorProblemPage';
import { v4 as uuidv4 } from 'uuid';
import { Checkbox } from "@material-ui/core";
import { useLocation } from "react-router-dom";

function Problem({ userGroup, email }) {
    const [fileContent, setFileContent] = useState("")
    const [CFFile, setCFFile] = useState("")
    const [diagram, setDiagram] = useState("")
    const textBoxData = useRef()
    const [checkBoxData, setCheckBoxData] = useState(false)
    const [problemName, setProblemName] = useState("")
    var id = 9;
    const { state } = useLocation();
    var reader = new FileReader()
    //console.log( {state} );

    //For loop to grab key with USER EMAIL value and assigns it to "var email" (from local storage)
    // for (var key in localStorage){
    //     if (key.match(/AuthUser$/g)) {
    //         email = localStorage.getItem(key)
    //     }
    // }

    useEffect(() => {
        
        if(CFFile !== ""){
        reader.readAsText(CFFile);
        }
    
        reader.onload = function(e){
        setFileContent(e.target.result);
    }
    }, [CFFile]);

    const handleSubmit = e => {
        //submit fields to lambda function
        e.preventDefault()

        
        
        const studentSubmission = {
            fileContent,
            textBoxData: textBoxData.current.value,
            checkBoxData,
            problemName: state.value.problemName,
            id,
            instructorEmail: state.value.instructor_email
            
            // INFORMATION ON THE PAGE
            // CFFile
            // diagram
            // diagramName
            // instructor_email
            // problemID
            // problemName
            // textBoxData
        }
        console.log(studentSubmission)

        const submissionForInstructor = {
            submission: CFFile,
            instructor_email: state.value.instructor_email,
            grade: "N/A",
            instructorReview: checkBoxData,
            studentsName: email,
            problemName: state.value.problemName

        }

        const submissionBody = {
            body: submissionForInstructor
        }

        API.post("studentProblems", "/studentProblems", submissionBody)
            .then(response => {
            })
            .catch(error => {
                console.log(error.response)
            })



        // api call
        const apiName = "submissions"
        const path = "/comparisonFunction"
        const myInit = {
            body: studentSubmission
        }
        
        console.log(studentSubmission)

        API.post(apiName, path, myInit)
            .then(response => {
                console.log({ response })
            })
            .catch(error => {
                console.log(error.response)
            })
        
        textBoxData.current.value = ""
        setProblemName("")
    };
    return (
        <div className="container">
            {userGroup === 'Students' ? <StudentProblemPage />: <InstructorProblemPage />}
            
        </div>
    )
}
export default Problem