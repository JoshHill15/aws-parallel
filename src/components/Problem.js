import React, { useRef, useState } from "react"
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
    const [CFFile, setCFFile] = useState("")
    const [diagram, setDiagram] = useState("")
    const textBoxData = useRef()
    const [checkBoxData, setCheckBoxData] = useState(false)
    const [problemName, setProblemName] = useState("")
    var id = 23;
    const { state } = useLocation();

    //For loop to grab key with USER EMAIL value and assigns it to "var email" (from local storage)
    // for (var key in localStorage){
    //     if (key.match(/AuthUser$/g)) {
    //         email = localStorage.getItem(key)
    //     }
    // }

    const handleSubmit = e => {
        //submit fields to lambda function
        e.preventDefault()
        const studentSubmission = {
            CFFile,
            textBoxData: textBoxData.current.value,
            checkBoxData,
            problemName: state.value.problemName,
            id,
            instructorEmail: state.value.instructor_email
        }
        console.log(studentSubmission)

        const submissionForInstructor = {
            submission: CFFile,
            instructor_email: state.value.instructor_email,
            grade: "N/A",
            // instructorReview: checkBoxData.current.value,
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



        //TODO 
        const instructorApiName = "instructorProblems"
        const instructorPath = "instructorProblems/"
        const apiName = "studentSubmissions"
        const path = "/studentSubmissions"
        const myInit = {
            body: studentSubmission
        }
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