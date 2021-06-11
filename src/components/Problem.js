import React, { useRef, useState } from "react"
import { Form } from 'react-bootstrap';
import { API, Storage } from "aws-amplify"
import Image from 'react-bootstrap/Image';
import { Row, Col, Container } from 'react-bootstrap';
import {v4 as uuidv4} from 'uuid';
import { Checkbox } from "@material-ui/core";
import { useLocation } from "react-router-dom";

function Problem(){
    const [CFFile, setCFFile] = useState("")
    const [diagram, setDiagram] = useState("")
    const textBoxData = useRef()
    const checkBoxData = useRef()
    const [problemName, setProblemName] = useState("")
    var email;
    var id = 9;
    const { state } = useLocation();
    //console.log( {state} );

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
            checkBoxData: checkBoxData.current.value,
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
        // async function getInstructorProblem() {
        //     const myInit = {
        //         queryStringParameters: {
        //             instructor_email: "josh_hill15@me.com",
        //             problemID: 2
        //         }
        //     }
        //     try {
        //         const result = await API.get("instructorProblems", "/instructorProblems/object/:instructor_email/:problemID", myInit)
        //         console.log("This is the result: ")
        //         console.log({ result })
        //     }
        //     catch (err) {
        //         console.error("err: ", err)
        //     }
        // }
        // async function getProblem() {
        //     try {
        //         let res = await API.get("instructorProblems", "/instructorProblems/query", {})
        //         console.log('{ res }', res)
        //         res = await Promise.all(res.map(async cv => {
        //             cv.diagram = await Storage.get(cv.diagramName)
        //             return cv
        //         }))
        //         setProblems(res)
        //     }
        //     catch (err) {
        //         console.error("err: ", err)
    
        //     }
        // }

       // console.log(instructorSubmission)

        // api call
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
                <Form.Group>
                    <Form.Label>Scenario: </Form.Label>
                    <Form.Control plaintext readOnly defaultValue={state.value.problemName}></Form.Control>
                    <Form.Control plaintext readOnly defaultValue={state.value.textBoxData} ></Form.Control>
                    <Container>
                        <Row>
                            <Col xs={6} md={8}>
                    <Image src={state.value.diagram} fluid rounded alt="image" />
                    </Col>
                    </Row>
                    </Container>
                </Form.Group>
                <Form.Group className="upload-fields">
                    <Form.File id="exampleFormControlFile1" label="Upload CloudFormation Template" onChange={e => setCFFile(e.target.files[0])}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Input Feedback</Form.Label>
                    <Form.Control ref={textBoxData} as="textarea" rows={3} />
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