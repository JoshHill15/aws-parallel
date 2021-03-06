import React, { useRef, useState, useEffect } from "react"
import { Form } from 'react-bootstrap';
import { API } from "aws-amplify"
import Image from 'react-bootstrap/Image';
import { Row, Col, Container } from 'react-bootstrap';
import { useLocation } from "react-router-dom";

function StudentProblemPage({ email, setUserSubmission }) {
    const [CFFile, setCFFile] = useState("");
    const [fileContent, setFileContent] = useState("");
    const textBoxData = useRef();
    const date = Date.now();
    const random = Math.floor(Math.random() * 100);
    const id = random + date;
    const { state } = useLocation();

    useEffect(() => {
        const reader = new FileReader();
        
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
            problemName: state.value.problemName,
            problem_id: id,
            email,
            instructor_email: state.value.instructor_email
        }
        console.log(studentSubmission);

        // const submissionForInstructor = {
        //     submission: CFFile,
        //     instructor_email: state.value.instructor_email,
        //     grade: "N/A",
        //     // instructorReview: checkBoxData.current.value,
        //     studentsName: email,
        //     problemName: state.value.problemName

        // }

        // const submissionBody = {
        //     body: submissionForInstructor
        // }

        // API.post("studentProblems", "/studentProblems", submissionBody)
        //     .then(response => {
        //     })
        //     .catch(error => {
        //         console.log(error.response)
        //     })

            const apiName = "comparisonfunction"
            const path = "/comparisonfunction"
            const myInit = {
                body: studentSubmission
            }

            API.post(apiName, path, myInit)
            .then(response => {
                console.log({ response })
                setUserSubmission(response)
            })
            .catch(error => {
                console.log(error)
            })


        // //TODO 
        // const apiName = "studentSubmissionAPI"
        // const path = "/studentSubmission"
        // const myInit = {
        //     body: studentSubmission
        // }
        // API.post(apiName, path, myInit)
        //     .then(response => {
        //         console.log({ response })
        //     })
        //     .catch(error => {
        //         console.log(error.response)
        //     })
        textBoxData.current.value = ""
    };
    return (
        <div className="container">
            <Form >
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
                    {/* <Form.Check onChange={e => setCheckBoxData(e.target.checked)} type="checkbox" label="Request Instructor Review" /> */}
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
export default StudentProblemPage