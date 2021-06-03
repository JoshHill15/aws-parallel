import React, { useRef, useState } from "react"
import { Form } from 'react-bootstrap';
import { API } from "aws-amplify"

function CreateProblem(){
    const [CFFile, setCFFile] = useState("")
    const [diagram, setDiagram] = useState("")
    const textBoxData = useRef()
    const [problemName, setProblemName] = useState("")
    var email;
    
    //For loop to grab key with USER EMAIL value and assigns it to "var email" (from local storage)
    for (var key in localStorage){
        if (key.match(/AuthUser$/g)) {
            email = localStorage.getItem(key)
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        
        const instructorSubmission = {
            problemName,
            CFFile,
            diagram,
            textBoxData: textBoxData.current.value,
            email
        }

       // console.log(instructorSubmission)

        // api call 
        const apiName = "createProblem"
        const path = "/createProblem"
        const myInit = {
            body: instructorSubmission
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
        <div>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Problem Name</Form.Label>
                    <Form.Control value={problemName} onChange={e => setProblemName(e.target.value)} placeholder="Enter problem name" />
                </Form.Group>
                <Form.Group>
                    <Form.File id="exampleFormControlFile1" label="Upload CloudFormation Template" onChange={e => setCFFile(e.target.files[0].name)}/>
                    <Form.File id="exampleFormControlFile1" label="Upload Architecture Diagram" onChange = {e => setDiagram(e.target.files[0].name)}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Input Problem Scenario</Form.Label>
                    <Form.Control ref={textBoxData} as="textarea" rows={6} />
                </Form.Group>
                <Form.Group>
                    <button onClick={handleSubmit}>
                        Submit
                    </button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default CreateProblem