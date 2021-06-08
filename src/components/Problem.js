import React, { useRef, useState } from "react"
import { Form } from 'react-bootstrap';
import { API } from "aws-amplify"
import {v4 as uuidv4} from 'uuid';
import "../styles/createProblem.css"
import { Checkbox } from "@material-ui/core";
function Problem(){
    const [CFFile, setCFFile] = useState("")
    const [diagram, setDiagram] = useState("")
    const textBoxData = useRef()
    const checkBoxData = useRef()
    const [problemName, setProblemName] = useState("")
    var email;
    var id = 2;
    //For loop to grab key with USER EMAIL value and assigns it to "var email" (from local storage)
    for (var key in localStorage){
        if (key.match(/AuthUser$/g)) {
            email = localStorage.getItem(key)
        }
    }

    const handleSubmit = e => {
        //submit fields to lambda function
        e.preventDefault()
        const studentSubmission = {
            CFFile,
            textBoxData: textBoxData.current.value,
            checkBoxData: checkBoxData.current.value,
            id,
            email
        }
        console.log(studentSubmission)

       // console.log(instructorSubmission)

        // api call
        //TODO 
        const apiName = "studentSubmissions"
        const path = "/studentSubmissions"
        const myInit = {
            body: studentSubmission
        }
        API.post(apiName, path, myInit)
            .then(response => {
                console.log({response})
            })
            .catch(error => {
                console.log(error.response)
            })
        textBoxData.current.value = ""
        setProblemName("")
    };
    return (
        <div className="container">
            <Form >
                <Form.Group controlId="formBasicEmail">
                    {/* <Form.Label>Problem Name</Form.Label>
                    <Form.Control size='lg' value={problemName} onChange={e => setProblemName(e.target.value)} placeholder="Enter problem name" /> */}
                </Form.Group>
                <Form.Group className="upload-fields">
                    <Form.File id="exampleFormControlFile1" label="Upload CloudFormation Template" onChange={e => setCFFile(e.target.files[0])}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Input Feedback</Form.Label>
                    <Form.Control ref={textBoxData} as="textarea" rows={6} />
                    <Form.Check ref={checkBoxData} type="checkbox" label="Request Manual Feedback" />
                </Form.Group>
                <Form.Group>
                    <button className="submit" onClick={handleSubmit}>
                        Submit
                    </button>
                </Form.Group>
            </Form>
        </div>
    )
}
export default Problem