import React, { useRef, useState } from "react"
import { Form } from 'react-bootstrap';

function CreateProblem(){
    const [CFFile, setCFFile] = useState("")
    const [diagram, setDiagram] = useState("")
    const textBoxData = useRef()

    const handleSubmit = e => {
        e.preventDefault()
        
        const instructorSubmission = {
            CFFile,
            diagram,
            textBoxData: textBoxData.current.value
        }

        // api call 


        textBoxData.current.value = ""
    };
    
    return (
        <div>
            <Form>
                <Form.Group>
                    <Form.File id="exampleFormControlFile1" label="Upload CloudFormation Template" onChange={e => setCFFile(e.target.files[0].name)}/>
                    <Form.File id="exampleFormControlFile1" label="Upload Architecture Diagram" onChange = {e => setDiagram(e.target.files[0].name)}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label onChange={e => console.log(e.target.value)}>Input Problem Scenario</Form.Label>
                    <Form.Control ref={textBoxData} as="textarea" rows={6} />
                </Form.Group>
                <Form.Group>
                    <button onClick={handleSubmit}>
                        Submit
                    </button>
                </Form.Group>
            </Form>
                {/* <button onClick={handleClick}>Upload a file </button>
                <input onChange={handleChange} type="file" style={{display:'none'}} ref={hiddenFileInput}/>  */}
        </div>
    )
}

export default CreateProblem