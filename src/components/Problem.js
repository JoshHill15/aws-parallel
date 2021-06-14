import React, { useRef, useState, useEffect } from "react"
import { Form } from 'react-bootstrap';
import { API, Storage } from "aws-amplify"
import Image from 'react-bootstrap/Image';
import { Row, Col, Container } from 'react-bootstrap';
import {v4 as uuidv4} from 'uuid';
import { Checkbox } from "@material-ui/core";
import { useLocation } from "react-router-dom";

function Problem(){
    const [fileContent, setFileContent] = useState("")
    const [CFFile, setCFFile] = useState("")
    const [diagram, setDiagram] = useState("")
    const textBoxData = useRef()
    const checkBoxData = useRef()
    const [problemName, setProblemName] = useState("")
    var email;
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

       // console.log(instructorSubmission)

        // api call
        const apiName = "submissions"
        const path = "/comparisonFunction"
        const myInit = {
            body: studentSubmission
        }
        
        console.log(studentSubmission)

        API.post(apiName, path, myInit)
            .then(response => {
                console.log({response})
            })
            .catch(error => {
                console.log(error)
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